using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.DTOs;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowAngular")]
public class NewsController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<NewsController> _logger;

    public NewsController(SmartEduDbContext context, ILogger<NewsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/news/header
    /// Truy vấn bảng tbl_HomepageSection theo SectionCode = 'NEWS_HEADER'
    /// </summary>
    [HttpGet("header")]
    public async Task<ActionResult<PageHeaderDto>> GetHeader()
    {
        try
        {
            var section = await _context.TblHomepageSections
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.SectionCode == "NEWS_HEADER");

            if (section != null)
            {
                return Ok(new PageHeaderDto
                {
                    SubTitle = !string.IsNullOrWhiteSpace(section.SubTitle)
                        ? section.SubTitle
                        : "TRI THỨC & PHƯƠNG PHÁP",
                    Title = !string.IsNullOrWhiteSpace(section.Title)
                        ? section.Title
                        : "Cẩm Nang Học Tập & Tin Tức Giáo Dục",
                    Content = !string.IsNullOrWhiteSpace(section.Content)
                        ? section.Content
                        : "Tổng hợp chiến lược làm bài thi, phân tích đề thi Tuyển sinh 10, bí quyết đồng hành cùng con và các thông báo hoạt động từ SmartEdu Academy.",
                    IsActive = section.IsActive ?? true
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query tbl_HomepageSection for NEWS_HEADER.");
        }

        return Ok(new PageHeaderDto
        {
            SubTitle = "TRI THỨC & PHƯƠNG PHÁP",
            Title = "Cẩm Nang Học Tập & Tin Tức Giáo Dục",
            Content = "Tổng hợp chiến lược làm bài thi, phân tích đề thi Tuyển sinh 10, bí quyết đồng hành cùng con và các thông báo hoạt động từ SmartEdu Academy.",
            IsActive = true
        });
    }

    /// <summary>
    /// GET /api/news/categories-with-articles
    /// Load tabs từ CategoryArticle và bài viết từ tbl_ArticleLV1 trực tiếp từ DB
    /// </summary>
    [HttpGet("categories-with-articles")]
    public async Task<ActionResult<NewsCategoriesWithArticlesResponseDto>> GetCategoriesWithArticles()
    {
        var response = new NewsCategoriesWithArticlesResponseDto();

        try
        {
            var dbCategories = await _context.CategoryArticles
                .AsNoTracking()
                .Where(c => c.Status ?? true)
                .OrderBy(c => c.DisplayOrder ?? 0)
                .ThenBy(c => c.CategoryId)
                .ToListAsync();

            var categoryTabs = new List<NewsCategoryDto>
            {
                new() { CategoryId = 0, Title = "Tất cả tin tức", Userkey = "all", DisplayOrder = 0 }
            };

            categoryTabs.AddRange(dbCategories.Select(c => new NewsCategoryDto
            {
                CategoryId = c.CategoryId,
                Title = c.Title,
                Userkey = string.IsNullOrWhiteSpace(c.Userkey) ? $"cat-{c.CategoryId}" : c.Userkey,
                DisplayOrder = c.DisplayOrder ?? 0
            }));

            var categoryDict = dbCategories.ToDictionary(c => c.CategoryId, c => c.Title);

            // Truy vấn bài viết trực tiếp từ CSDL
            var dbArticles = await _context.TblArticleLv1s
                .AsNoTracking()
                .Where(a => a.Ispublic ?? true)
                .OrderByDescending(a => a.Published ?? a.CreatedDate)
                .ThenByDescending(a => a.ArticleId)
                .ToListAsync();

            var mappedArticles = new List<NewsArticleDto>();

            // Lấy map bổ sung nếu có
            var categoryMaps = await _context.TblArticleCategoryMaps
                .AsNoTracking()
                .ToListAsync();
            var mapLookup = categoryMaps.ToLookup(m => m.ArticleId, m => m.CategoryId);

            foreach (var a in dbArticles)
            {
                int? catId = a.CategoryId;
                if (!catId.HasValue || catId == 0)
                {
                    var mappedCat = mapLookup[a.ArticleId].FirstOrDefault();
                    if (mappedCat > 0) catId = mappedCat;
                }

                string catName = "Tin Tức";
                if (catId.HasValue && categoryDict.TryGetValue(catId.Value, out var cName))
                {
                    catName = cName;
                }

                mappedArticles.Add(new NewsArticleDto
                {
                    ArticleId = a.ArticleId,
                    Title = a.Title,
                    Brief = a.Brief,
                    Picture = a.Picture,
                    Published = a.Published ?? a.CreatedDate,
                    Userkey = a.Userkey,
                    CategoryId = catId,
                    CategoryName = catName,
                    Author = a.Author ?? "Ban Biên Tập SmartEdu"
                });
            }

            // Render trực tiếp từ DB
            response.Categories = categoryTabs;
            response.Articles = mappedArticles;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query CategoryArticle or tbl_ArticleLV1 from PostgreSQL.");
        }

        response.Categories = new List<NewsCategoryDto>
        {
            new() { CategoryId = 0, Title = "Tất cả tin tức", Userkey = "all", DisplayOrder = 0 }
        };
        response.Articles = new List<NewsArticleDto>();
        return Ok(response);
    }

    /// <summary>
    /// GET /api/news/detail/{slug}
    /// Lấy chi tiết bài viết theo Userkey (slug) hoặc ArticleId, tự động tăng lượt xem
    /// </summary>
    [HttpGet("detail/{slug}")]
    public async Task<ActionResult<ArticleDetailDto>> GetArticleDetail(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return BadRequest(new { message = "Slug không được để trống." });
        }

        try
        {
            var cleanSlug = slug.Trim();
            int.TryParse(cleanSlug, out int parsedId);

            // 1. Tìm bài viết theo Userkey (slug) hoặc ArticleId
            var article = await _context.TblArticleLv1s
                .FirstOrDefaultAsync(a =>
                    (a.Userkey != null && a.Userkey.ToLower() == cleanSlug.ToLower()) ||
                    (parsedId > 0 && a.ArticleId == parsedId));

            if (article == null)
            {
                return NotFound(new { message = "Không tìm thấy bài viết yêu cầu." });
            }

            // 2. Tự động tăng lượt xem (ClickNumber)
            article.ClickNumber = (article.ClickNumber ?? 0) + 1;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Không thể cập nhật lượt xem cho bài viết ID {ArticleId}", article.ArticleId);
            }

            // 3. Lấy tên chuyên mục (CategoryName)
            string categoryName = "Tin Tức & Cẩm Nang";
            int? categoryId = article.CategoryId;

            if (!categoryId.HasValue || categoryId == 0)
            {
                var map = await _context.TblArticleCategoryMaps
                    .AsNoTracking()
                    .FirstOrDefaultAsync(m => m.ArticleId == article.ArticleId);
                if (map != null)
                {
                    categoryId = map.CategoryId;
                }
            }

            if (categoryId.HasValue && categoryId > 0)
            {
                var cat = await _context.CategoryArticles
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.CategoryId == categoryId.Value);
                if (cat != null && !string.IsNullOrWhiteSpace(cat.Title))
                {
                    categoryName = cat.Title;
                }
            }

            var dto = new ArticleDetailDto
            {
                ArticleId = article.ArticleId,
                Title = article.Title,
                Brief = article.Brief,
                Contentd = article.Contentd,
                Picture = article.Picture,
                Author = !string.IsNullOrWhiteSpace(article.Author) ? article.Author : "Ban Chuyên Môn SmartEdu",
                Published = article.Published ?? article.CreatedDate,
                Views = article.ClickNumber ?? 1,
                CategoryId = categoryId,
                CategoryName = categoryName,
                Slug = !string.IsNullOrWhiteSpace(article.Userkey) ? article.Userkey : article.ArticleId.ToString(),
                SeoTitle = !string.IsNullOrWhiteSpace(article.SEOTitle) ? article.SEOTitle : article.Title,
                SeoDescription = !string.IsNullOrWhiteSpace(article.SEODescription) ? article.SEODescription : article.Brief,
                SeoKeyword = article.SEOKeyword
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi xảy ra khi truy vấn chi tiết bài viết cho slug: {Slug}", slug);
            return StatusCode(500, new { message = "Lỗi máy chủ khi lấy chi tiết bài viết." });
        }
    }

    /// <summary>
    /// GET /api/news/related/{categoryId}/{currentArticleId}
    /// Lấy 2 đến 4 bài viết liên quan cùng chuyên mục (loại trừ bài viết hiện tại)
    /// </summary>
    [HttpGet("related/{categoryId:int}/{currentArticleId:int}")]
    public async Task<ActionResult<List<RelatedArticleDto>>> GetRelatedArticles(int categoryId, int currentArticleId)
    {
        try
        {
            var categoryDict = await _context.CategoryArticles
                .AsNoTracking()
                .ToDictionaryAsync(c => c.CategoryId, c => c.Title);

            // 1. Tìm bài viết cùng CategoryId
            var query = _context.TblArticleLv1s
                .AsNoTracking()
                .Where(a => a.ArticleId != currentArticleId && (a.Ispublic ?? true));

            List<TblArticleLv1> relatedDb;

            if (categoryId > 0)
            {
                // Thử lấy theo CategoryId trực tiếp
                relatedDb = await query
                    .Where(a => a.CategoryId == categoryId)
                    .OrderByDescending(a => a.Published ?? a.CreatedDate)
                    .ThenByDescending(a => a.ArticleId)
                    .Take(4)
                    .ToListAsync();

                // Nếu ít hơn 2 bài, lấy thêm các bài viết mới nhất khác để đảm bảo luôn có 2-4 bài liên quan
                if (relatedDb.Count < 2)
                {
                    var existingIds = relatedDb.Select(r => r.ArticleId).Append(currentArticleId).ToList();
                    var fallbackArticles = await query
                        .Where(a => !existingIds.Contains(a.ArticleId))
                        .OrderByDescending(a => a.Published ?? a.CreatedDate)
                        .ThenByDescending(a => a.ArticleId)
                        .Take(4 - relatedDb.Count)
                        .ToListAsync();
                    relatedDb.AddRange(fallbackArticles);
                }
            }
            else
            {
                relatedDb = await query
                    .OrderByDescending(a => a.Published ?? a.CreatedDate)
                    .ThenByDescending(a => a.ArticleId)
                    .Take(4)
                    .ToListAsync();
            }

            var result = relatedDb.Select(a =>
            {
                string catName = "Tin Tức & Cẩm Nang";
                if (a.CategoryId.HasValue && categoryDict.TryGetValue(a.CategoryId.Value, out var cName))
                {
                    catName = cName;
                }

                return new RelatedArticleDto
                {
                    ArticleId = a.ArticleId,
                    Title = a.Title,
                    Brief = a.Brief,
                    Picture = a.Picture,
                    Slug = !string.IsNullOrWhiteSpace(a.Userkey) ? a.Userkey : a.ArticleId.ToString(),
                    Published = a.Published ?? a.CreatedDate,
                    CategoryId = a.CategoryId,
                    CategoryName = catName
                };
            }).ToList();

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi xảy ra khi lấy danh sách bài viết liên quan cho Category: {CategoryId}", categoryId);
            return StatusCode(500, new List<RelatedArticleDto>());
        }
    }
}

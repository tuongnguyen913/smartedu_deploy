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
public class MediaController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<MediaController> _logger;

    public MediaController(SmartEduDbContext context, ILogger<MediaController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/media/header
    /// Truy vấn bảng tbl_HomepageSection theo SectionCode = 'MEDIA_HEADER'
    /// </summary>
    [HttpGet("header")]
    public async Task<ActionResult<PageHeaderDto>> GetHeader()
    {
        try
        {
            var section = await _context.TblHomepageSections
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.SectionCode == "MEDIA_HEADER");

            if (section != null)
            {
                return Ok(new PageHeaderDto
                {
                    SubTitle = !string.IsNullOrWhiteSpace(section.SubTitle)
                        ? section.SubTitle
                        : "HÌNH ẢNH THỰC TẾ",
                    Title = !string.IsNullOrWhiteSpace(section.Title)
                        ? section.Title
                        : "Thư Viện Không Gian & Hoạt Động Giảng Huấn",
                    Content = !string.IsNullOrWhiteSpace(section.Content)
                        ? section.Content
                        : "Khám phá không gian học tập hiện đại, phòng học máy lạnh tiêu chuẩn cùng những khoảnh khắc học tập nhiệt huyết của thầy trò SmartEdu Academy.",
                    IsActive = section.IsActive ?? true
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query tbl_HomepageSection for MEDIA_HEADER. Returning fallback.");
        }

        return Ok(new PageHeaderDto
        {
            SubTitle = "HÌNH ẢNH THỰC TẾ",
            Title = "Thư Viện Không Gian & Hoạt Động Giảng Huấn",
            Content = "Khám phá không gian học tập hiện đại, phòng học máy lạnh tiêu chuẩn cùng những khoảnh khắc học tập nhiệt huyết của thầy trò SmartEdu Academy.",
            IsActive = true
        });
    }

    /// <summary>
    /// GET /api/media/albums-with-items
    /// Load tabs từ Albums (IsActive = true), items từ Medias (IsActive = true) kết nối Albums
    /// </summary>
    [HttpGet("albums-with-items")]
    public async Task<ActionResult<MediaAlbumsWithItemsResponseDto>> GetAlbumsWithItems()
    {
        var response = new MediaAlbumsWithItemsResponseDto();

        try
        {
            var dbAlbums = await _context.Albums
                .AsNoTracking()
                .Where(a => a.IsActive ?? true)
                .OrderBy(a => a.DisplayOrder ?? 0)
                .ThenBy(a => a.Id)
                .ToListAsync();

            var albumTabs = new List<AlbumTabDto>
            {
                new() { Id = 0, Name = "Tất cả Media", Slug = "all", Description = "Tất cả hình ảnh & hoạt động", DisplayOrder = 0 }
            };

            albumTabs.AddRange(dbAlbums.Select(a => new AlbumTabDto
            {
                Id = a.Id,
                Name = a.Name,
                Slug = string.IsNullOrWhiteSpace(a.Slug) ? $"album-{a.Id}" : a.Slug,
                Description = a.Description,
                CoverImage = a.CoverImage,
                DisplayOrder = a.DisplayOrder ?? 0
            }));

            var albumDict = dbAlbums.ToDictionary(a => a.Id, a => (Name: a.Name, Slug: a.Slug));

            var dbMedias = await _context.Medias
                .AsNoTracking()
                .Where(m => m.IsActive ?? true)
                .OrderBy(m => m.DisplayOrder ?? 0)
                .ThenBy(m => m.Id)
                .ToListAsync();

            var mediaItems = dbMedias.Select(m =>
            {
                string aName = "SmartEdu Media";
                string aSlug = "smartedu";
                if (m.AlbumId.HasValue && albumDict.TryGetValue(m.AlbumId.Value, out var info))
                {
                    aName = info.Name;
                    aSlug = info.Slug;
                }

                bool isVideo = (!string.IsNullOrWhiteSpace(m.MimeType) && m.MimeType.StartsWith("video", StringComparison.OrdinalIgnoreCase))
                               || (!string.IsNullOrWhiteSpace(m.Url) && (m.Url.EndsWith(".mp4", StringComparison.OrdinalIgnoreCase) || m.Url.EndsWith(".webm", StringComparison.OrdinalIgnoreCase)));

                return new MediaItemDto
                {
                    Id = m.Id,
                    AlbumId = m.AlbumId,
                    AlbumName = aName,
                    AlbumSlug = aSlug,
                    Name = m.Name ?? aName,
                    Url = m.Url,
                    MimeType = m.MimeType,
                    ThumbnailUrl = m.Url,
                    MediaType = isVideo ? "video" : "image",
                    Caption = m.Name ?? aName
                };
            }).ToList();

            response.Albums = albumTabs;
            response.Items = mediaItems;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query Albums or Medias. Returning fallback data.");
        }

        response.Albums = GetDefaultSeedAlbumTabs();
        response.Items = GetDefaultSeedMediaItems();
        return Ok(response);
    }

    /// <summary>
    /// GET /api/media
    /// Alias trả về danh sách media items
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<MediaItemDto>>> GetAllMedias()
    {
        var result = await GetAlbumsWithItems();
        if (result.Result is OkObjectResult ok && ok.Value is MediaAlbumsWithItemsResponseDto res)
        {
            return Ok(res.Items);
        }
        return Ok(GetDefaultSeedMediaItems());
    }

    private static List<AlbumTabDto> GetDefaultSeedAlbumTabs()
    {
        return new List<AlbumTabDto>
        {
            new() { Id = 0, Name = "Tất cả Media", Slug = "all", Description = "Tất cả hình ảnh & hoạt động", DisplayOrder = 0 },
            new() { Id = 1, Name = "Cơ sở vật chất", Slug = "co-so-vat-chat", Description = "Không gian học tập & phòng chức năng", CoverImage = "assets/images/gallery-1.jpg", DisplayOrder = 1 },
            new() { Id = 2, Name = "Hoạt động giảng dạy", Slug = "hoat-dong-giang-day", Description = "Lớp học tương tác & giờ kèm 1:1", CoverImage = "assets/images/gallery-2.jpg", DisplayOrder = 2 },
            new() { Id = 3, Name = "Vinh danh bảng vàng", Slug = "vinh-danh-bang-vang", Description = "Lễ tuyên dương thủ khoa & á khoa", CoverImage = "assets/images/gallery-3.jpg", DisplayOrder = 3 }
        };
    }

    private static List<MediaItemDto> GetDefaultSeedMediaItems()
    {
        return new List<MediaItemDto>
        {
            new()
            {
                Id = 1,
                AlbumId = 1,
                AlbumName = "Cơ sở vật chất",
                AlbumSlug = "co-so-vat-chat",
                Name = "Phòng học tiêu chuẩn 15 học sinh - Cơ sở Đường Số 6",
                Url = "assets/images/gallery-1.jpg",
                ThumbnailUrl = "assets/images/gallery-1.jpg",
                MediaType = "image",
                Caption = "Ánh sáng đạt chuẩn chống cận thị, máy chiếu tương tác hiện đại"
            },
            new()
            {
                Id = 2,
                AlbumId = 1,
                AlbumName = "Cơ sở vật chất",
                AlbumSlug = "co-so-vat-chat",
                Name = "Khu vực tự học & Thư viện mở SmartEdu",
                Url = "assets/images/gallery-2.jpg",
                ThumbnailUrl = "assets/images/gallery-2.jpg",
                MediaType = "image",
                Caption = "Không gian yên tĩnh có trà bánh và giáo viên trực hỗ trợ bài tập"
            },
            new()
            {
                Id = 3,
                AlbumId = 2,
                AlbumName = "Hoạt động giảng dạy",
                AlbumSlug = "hoat-dong-giang-day",
                Name = "Giờ học Toán thực tế cùng Thầy Nguyễn Văn Tuấn",
                Url = "assets/images/gallery-3.jpg",
                ThumbnailUrl = "assets/images/gallery-3.jpg",
                MediaType = "image",
                Caption = "Học sinh hào hứng thảo luận và tìm hướng giải bài toán hình học"
            },
            new()
            {
                Id = 4,
                AlbumId = 2,
                AlbumName = "Hoạt động giảng dạy",
                AlbumSlug = "hoat-dong-giang-day",
                Name = "Tiết học KHTN thực nghiệm tương tác",
                Url = "assets/images/gallery-4.jpg",
                ThumbnailUrl = "assets/images/gallery-4.jpg",
                MediaType = "image",
                Caption = "Trực quan hóa các định luật vật lý và phản ứng hóa học"
            },
            new()
            {
                Id = 5,
                AlbumId = 3,
                AlbumName = "Vinh danh bảng vàng",
                AlbumSlug = "vinh-danh-bang-vang",
                Name = "Trao thưởng học sinh đạt điểm 10 Tuyển sinh 10",
                Url = "assets/images/gallery-5.jpg",
                ThumbnailUrl = "assets/images/gallery-5.jpg",
                MediaType = "image",
                Caption = "Niềm vui của thầy trò trong ngày công bố kết quả tuyển sinh"
            },
            new()
            {
                Id = 6,
                AlbumId = 2,
                AlbumName = "Hoạt động giảng dạy",
                AlbumSlug = "hoat-dong-giang-day",
                Name = "Phút giây tập trung làm bài thi thử ĐGNL",
                Url = "assets/images/gallery-6.jpg",
                ThumbnailUrl = "assets/images/gallery-6.jpg",
                MediaType = "image",
                Caption = "Rèn luyện bản lĩnh phòng thi và phân bổ thời gian tối ưu"
            }
        };
    }
}


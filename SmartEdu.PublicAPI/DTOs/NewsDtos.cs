namespace SmartEdu.PublicAPI.DTOs;

public class NewsCategoryDto
{
    public int CategoryId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Userkey { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}

public class NewsArticleDto
{
    public int ArticleId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Brief { get; set; }
    public string? Picture { get; set; }
    public DateTime? Published { get; set; }
    public string? Userkey { get; set; }
    public int? CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string? Author { get; set; }
}

public class NewsCategoriesWithArticlesResponseDto
{
    public List<NewsCategoryDto> Categories { get; set; } = new();
    public List<NewsArticleDto> Articles { get; set; } = new();
}

public class ArticleDetailDto
{
    public int ArticleId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Brief { get; set; }
    public string? Contentd { get; set; }
    public string? Picture { get; set; }
    public string? Author { get; set; }
    public DateTime? Published { get; set; }
    public int Views { get; set; }
    public int? CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }
    public string? SeoKeyword { get; set; }
}

public class RelatedArticleDto
{
    public int ArticleId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Brief { get; set; }
    public string? Picture { get; set; }
    public string? Slug { get; set; }
    public DateTime? Published { get; set; }
    public int? CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
}


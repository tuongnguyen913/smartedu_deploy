namespace SmartEdu.PublicAPI.DTOs;

public class AlbumTabDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverImage { get; set; }
    public int DisplayOrder { get; set; }
}

public class MediaItemDto
{
    public int Id { get; set; }
    public int? AlbumId { get; set; }
    public string AlbumName { get; set; } = string.Empty;
    public string AlbumSlug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string? MimeType { get; set; }
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string MediaType { get; set; } = "image";
    public string? Caption { get; set; }
}

public class MediaAlbumsWithItemsResponseDto
{
    public List<AlbumTabDto> Albums { get; set; } = new();
    public List<MediaItemDto> Items { get; set; } = new();
}


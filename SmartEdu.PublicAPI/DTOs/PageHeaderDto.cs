namespace SmartEdu.PublicAPI.DTOs;

public class PageHeaderDto
{
    public string SubTitle { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}


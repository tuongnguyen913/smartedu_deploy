namespace SmartEdu.PublicAPI.DTOs;

public class MenuItemDto
{
    public int ModuleId { get; set; }
    public string ModuleName { get; set; } = string.Empty;
    public string ModuleKey { get; set; } = string.Empty;
    public string? UrlFrontEnd { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
    public int? ParentId { get; set; }
    public bool OnTopMenu { get; set; }
    public string? Icon { get; set; }
    public bool IsClickable { get; set; } = true;
    public bool TargetBlank { get; set; } = false;
    public List<MenuItemDto> Children { get; set; } = new();
}


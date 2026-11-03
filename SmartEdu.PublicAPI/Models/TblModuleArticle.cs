using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("tbl_ModuleArticle", Schema = "public")]
public class TblModuleArticle
{
    [Key]
    [Column("ModuleId")]
    public int ModuleId { get; set; }

    [Column("ModuleName")]
    [Required]
    [MaxLength(255)]
    public string ModuleName { get; set; } = string.Empty;

    [Column("ModuleKey")]
    [Required]
    [MaxLength(150)]
    public string ModuleKey { get; set; } = string.Empty;

    [Column("UrlFrontEnd")]
    [MaxLength(500)]
    public string? UrlFrontEnd { get; set; }

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; } = 0;

    [Column("IsActive")]
    public bool? IsActive { get; set; } = true;

    [Column("ParentId")]
    public int? ParentId { get; set; }

    [Column("OnTopMenu")]
    public bool? OnTopMenu { get; set; } = true;

    [Column("Icon")]
    [MaxLength(100)]
    public string? Icon { get; set; }

    [Column("IsClickable")]
    public bool? IsClickable { get; set; } = true;

    [Column("TargetBlank")]
    public bool? TargetBlank { get; set; } = false;
}


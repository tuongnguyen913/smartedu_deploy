using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("CategoryArticle", Schema = "public")]
public class CategoryArticle
{
    [Key]
    [Column("CategoryId")]
    public int CategoryId { get; set; }

    [Required]
    [Column("Title")]
    [MaxLength(255)]
    public string Title { get; set; } = string.Empty;

    [Column("Description")]
    public string? Description { get; set; }

    [Column("Userkey")]
    [MaxLength(255)]
    public string? Userkey { get; set; }

    [Column("ParentId")]
    public int? ParentId { get; set; }

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; } = 0;

    [Column("Status")]
    public bool? Status { get; set; } = true;

    [Column("Picture")]
    [MaxLength(500)]
    public string? Picture { get; set; }

    [Column("SEOTitle")]
    [MaxLength(255)]
    public string? SEOTitle { get; set; }

    [Column("SEODescription")]
    [MaxLength(500)]
    public string? SEODescription { get; set; }

    [Column("SEOKeyWord")]
    [MaxLength(255)]
    public string? SEOKeyWord { get; set; }

    [Column("LanguageCode")]
    [MaxLength(10)]
    public string? LanguageCode { get; set; }
}


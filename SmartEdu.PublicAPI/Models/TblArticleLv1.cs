using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("tbl_ArticleLV1", Schema = "public")]
public class TblArticleLv1
{
    [Key]
    [Column("ArticleId")]
    public int ArticleId { get; set; }

    [Column("Userkey")]
    [MaxLength(255)]
    public string? Userkey { get; set; }

    [Column("ClickNumber")]
    public int? ClickNumber { get; set; } = 0;

    [Column("Published")]
    public DateTime? Published { get; set; }

    [Required]
    [Column("Title")]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;

    [Column("Brief")]
    public string? Brief { get; set; }

    [Column("Contentd")]
    public string? Contentd { get; set; }

    [Column("Picture")]
    [MaxLength(500)]
    public string? Picture { get; set; }

    [Column("Source")]
    [MaxLength(255)]
    public string? Source { get; set; }

    [Column("Author")]
    [MaxLength(150)]
    public string? Author { get; set; }

    [Column("IsHightLight")]
    public bool? IsHightLight { get; set; } = false;

    [Column("Ispublic")]
    public bool? Ispublic { get; set; } = true;

    [Column("CreatedDate")]
    public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

    [Column("CreatedBy")]
    [MaxLength(100)]
    public string? CreatedBy { get; set; }

    [Column("UpdatedDtg")]
    public DateTime? UpdatedDtg { get; set; }

    [Column("UpdatedBy")]
    [MaxLength(100)]
    public string? UpdatedBy { get; set; }

    [Column("SEOTitle")]
    [MaxLength(255)]
    public string? SEOTitle { get; set; }

    [Column("SEODescription")]
    [MaxLength(500)]
    public string? SEODescription { get; set; }

    [Column("SEOKeyword")]
    [MaxLength(255)]
    public string? SEOKeyword { get; set; }

    [Column("LanguageCode")]
    [MaxLength(10)]
    public string? LanguageCode { get; set; }

    [Column("ModuleId")]
    public int? ModuleId { get; set; }

    [Column("Indexd")]
    public int? Indexd { get; set; } = 0;

    [Column("CategoryId")]
    public int? CategoryId { get; set; }

    [Column("Ishot")]
    public bool? Ishot { get; set; } = false;

    [Column("DocumentCode")]
    [MaxLength(100)]
    public string? DocumentCode { get; set; }

    [Column("AttachmentUrl")]
    [MaxLength(500)]
    public string? AttachmentUrl { get; set; }

    [Column("ArticleType")]
    public int? ArticleType { get; set; } = 1;
}


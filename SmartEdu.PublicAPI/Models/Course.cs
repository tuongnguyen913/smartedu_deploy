using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("Courses", Schema = "public")]
public class Course
{
    [Key]
    [Column("CourseId")]
    public int CourseId { get; set; }

    [Required]
    [Column("CourseName")]
    [MaxLength(250)]
    public string CourseName { get; set; } = string.Empty;

    [Required]
    [Column("Slug")]
    [MaxLength(250)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [Column("GradeLevel")]
    [MaxLength(50)]
    public string GradeLevel { get; set; } = string.Empty;

    [Column("Grade")]
    [MaxLength(50)]
    public string? Grade { get; set; }

    [Required]
    [Column("Subject")]
    [MaxLength(100)]
    public string Subject { get; set; } = string.Empty;

    [Column("ShortDescription")]
    [MaxLength(1000)]
    public string? ShortDescription { get; set; }

    [Column("ContentHtml")]
    public string? ContentHtml { get; set; }

    [Column("ThumbnailUrl")]
    [MaxLength(500)]
    public string? ThumbnailUrl { get; set; }

    [Column("BannerUrl")]
    [MaxLength(500)]
    public string? BannerUrl { get; set; }

    [Column("PsychologyOverview")]
    [MaxLength(2000)]
    public string? PsychologyOverview { get; set; }

    [Column("TargetKnowledge")]
    [MaxLength(1000)]
    public string? TargetKnowledge { get; set; }

    [Column("TargetThinking")]
    [MaxLength(1000)]
    public string? TargetThinking { get; set; }

    [Column("TargetSkills")]
    [MaxLength(1000)]
    public string? TargetSkills { get; set; }

    [Column("TuitionFee", TypeName = "numeric(18,2)")]
    public decimal? TuitionFee { get; set; }

    [Column("TuitionPeriod")]
    [MaxLength(100)]
    public string? TuitionPeriod { get; set; }

    [Column("ScheduleSummary")]
    [MaxLength(250)]
    public string? ScheduleSummary { get; set; }

    [Column("ClassSizeMax")]
    public int? ClassSizeMax { get; set; }

    [Column("HasFreeTutoringGuarantee")]
    public bool? HasFreeTutoringGuarantee { get; set; } = true;

    [Column("HasTuitionRefundGuarantee")]
    public bool? HasTuitionRefundGuarantee { get; set; } = true;

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; } = 0;

    [Column("IsFeatured")]
    public bool? IsFeatured { get; set; } = false;

    [Column("IsActive")]
    public bool? IsActive { get; set; } = true;

    [Column("SeoTitle")]
    [MaxLength(250)]
    public string? SeoTitle { get; set; }

    [Column("SeoDescription")]
    [MaxLength(500)]
    public string? SeoDescription { get; set; }

    [Column("SeoKeywords")]
    [MaxLength(250)]
    public string? SeoKeywords { get; set; }

    [Column("CreatedDate")]
    public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

    [Column("CreatedBy")]
    [MaxLength(100)]
    public string? CreatedBy { get; set; }

    [Column("UpdatedDate")]
    public DateTime? UpdatedDate { get; set; }

    [Column("UpdatedBy")]
    [MaxLength(100)]
    public string? UpdatedBy { get; set; }
}


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("Teachers", Schema = "public")]
public class Teacher
{
    [Key]
    [Column("TeacherId")]
    public int TeacherId { get; set; }

    [Required]
    [Column("FullName")]
    [StringLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [Column("Slug")]
    [StringLength(150)]
    public string Slug { get; set; } = string.Empty;

    [Column("AcademicDegree")]
    [StringLength(100)]
    public string? AcademicDegree { get; set; }

    [Column("GraduatedUniversity")]
    [StringLength(200)]
    public string? GraduatedUniversity { get; set; }

    [Column("Position")]
    [StringLength(150)]
    public string? Position { get; set; }

    [Column("Subject")]
    [StringLength(100)]
    public string? Subject { get; set; }

    [Column("GradeLevels")]
    [StringLength(100)]
    public string? GradeLevels { get; set; }

    [Column("ExperienceYears")]
    public int? ExperienceYears { get; set; }

    [Column("TeachingPhilosophy")]
    public string? TeachingPhilosophy { get; set; }

    [Column("BioTimelineJson")]
    public string? BioTimelineJson { get; set; }

    [Column("AvatarUrl")]
    [StringLength(500)]
    public string? AvatarUrl { get; set; }

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; }

    [Column("IsFeatured")]
    public bool? IsFeatured { get; set; }

    [Column("IsActive")]
    public bool? IsActive { get; set; }

    [Column("SeoTitle")]
    [StringLength(200)]
    public string? SeoTitle { get; set; }

    [Column("SeoDescription")]
    [StringLength(500)]
    public string? SeoDescription { get; set; }

    [Column("SeoKeywords")]
    [StringLength(250)]
    public string? SeoKeywords { get; set; }

    [Column("CreatedDate")]
    public DateTime? CreatedDate { get; set; }

    [Column("CreatedBy")]
    [StringLength(100)]
    public string? CreatedBy { get; set; }

    [Column("UpdatedDate")]
    public DateTime? UpdatedDate { get; set; }

    [Column("UpdatedBy")]
    [StringLength(100)]
    public string? UpdatedBy { get; set; }
}


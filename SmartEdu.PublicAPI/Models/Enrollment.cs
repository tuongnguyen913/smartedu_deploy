using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("Enrollments", Schema = "public")]
public class Enrollment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int EnrollmentId { get; set; }

    [Required]
    [MaxLength(200)]
    public string ParentName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string PhoneNumber { get; set; } = string.Empty;

    [MaxLength(150)]
    public string? Email { get; set; }

    [MaxLength(200)]
    public string? StudentName { get; set; }

    [MaxLength(50)]
    public string? GradeLevel { get; set; }

    public int? BranchId { get; set; }

    public int? CourseId { get; set; }

    [MaxLength(500)]
    public string? LearningNeed { get; set; }

    [MaxLength(100)]
    public string? SourcePage { get; set; }

    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = "Pending";

    [MaxLength(1000)]
    public string? AdminNotes { get; set; }

    public DateTime? CreatedDate { get; set; } = DateTime.Now;

    public DateTime? ProcessedDate { get; set; }

    [MaxLength(100)]
    public string? ProcessedBy { get; set; }
}


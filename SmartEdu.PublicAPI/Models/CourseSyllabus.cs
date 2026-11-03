using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("CourseSyllabus", Schema = "public")]
public class CourseSyllabus
{
    [Key]
    [Column("SyllabusId")]
    public int SyllabusId { get; set; }

    [Column("CourseId")]
    public int CourseId { get; set; }

    [Required]
    [Column("SemesterName")]
    [MaxLength(100)]
    public string SemesterName { get; set; } = string.Empty;

    [Required]
    [Column("TopicTitle")]
    [MaxLength(250)]
    public string TopicTitle { get; set; } = string.Empty;

    [Column("TopicContent")]
    public string? TopicContent { get; set; }

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; } = 0;
}


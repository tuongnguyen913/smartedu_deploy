using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("tbl_HomepageSection", Schema = "public")]
public class TblHomepageSection
{
    [Key]
    [Column("Id")]
    public int Id { get; set; }

    [Required]
    [Column("SectionCode")]
    [StringLength(100)]
    public string SectionCode { get; set; } = string.Empty;

    [Column("Title")]
    [StringLength(255)]
    public string? Title { get; set; }

    [Column("SubTitle")]
    [StringLength(500)]
    public string? SubTitle { get; set; }

    [Column("Content")]
    public string? Content { get; set; }

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; }

    [Column("IsActive")]
    public bool? IsActive { get; set; }
}


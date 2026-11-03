using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("Albums", Schema = "public")]
public class Album
{
    [Key]
    [Column("Id")]
    public int Id { get; set; }

    [Required]
    [Column("Name")]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Column("Slug")]
    [MaxLength(255)]
    public string Slug { get; set; } = string.Empty;

    [Column("Description")]
    public string? Description { get; set; }

    [Column("CoverImage")]
    [MaxLength(500)]
    public string? CoverImage { get; set; }

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; } = 0;

    [Column("IsActive")]
    public bool? IsActive { get; set; } = true;

    [Column("CreatedDate")]
    public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
}


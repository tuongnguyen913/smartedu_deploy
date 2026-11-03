using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("Medias", Schema = "public")]
public class Media
{
    [Key]
    [Column("Id")]
    public int Id { get; set; }

    [Column("AlbumId")]
    public int? AlbumId { get; set; }

    [Column("Name")]
    [MaxLength(255)]
    public string? Name { get; set; }

    [Required]
    [Column("Url")]
    [MaxLength(500)]
    public string Url { get; set; } = string.Empty;

    [Column("MimeType")]
    [MaxLength(100)]
    public string? MimeType { get; set; }

    [Column("FileSize")]
    public long? FileSize { get; set; }

    [Column("DisplayOrder")]
    public int? DisplayOrder { get; set; } = 0;

    [Column("IsActive")]
    public bool? IsActive { get; set; } = true;

    [Column("CreatedDate")]
    public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
}


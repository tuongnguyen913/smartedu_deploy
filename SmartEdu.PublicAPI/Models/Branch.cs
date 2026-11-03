using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("Branches", Schema = "public")]
public class Branch
{
    [Key]
    public int BranchId { get; set; }

    [Required]
    [MaxLength(200)]
    public string BranchName { get; set; } = string.Empty;

    [Required]
    [MaxLength(300)]
    public string Address { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(50)]
    public string? Hotline { get; set; }

    [MaxLength(100)]
    public string? Email { get; set; }

    [MaxLength(200)]
    public string? WorkingHours { get; set; }

    [MaxLength(1000)]
    public string? GoogleMapsEmbedUrl { get; set; }

    [MaxLength(1000)]
    public string? GoogleMapsDirectionsUrl { get; set; }

    [Column(TypeName = "numeric(10,7)")]
    public decimal? Latitude { get; set; }

    [Column(TypeName = "numeric(10,7)")]
    public decimal? Longitude { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public int? DisplayOrder { get; set; } = 0;

    public bool? IsActive { get; set; } = true;
}


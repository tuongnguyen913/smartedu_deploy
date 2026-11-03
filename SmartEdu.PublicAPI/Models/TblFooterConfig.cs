using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("tbl_FooterConfig", Schema = "public")]
public class TblFooterConfig
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string CompanyName { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Address { get; set; }

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(50)]
    public string? Hotline { get; set; }

    [MaxLength(100)]
    public string? Email { get; set; }

    [MaxLength(255)]
    public string? Website { get; set; }

    [MaxLength(500)]
    public string? CopyrightText { get; set; }

    public bool? IsActive { get; set; } = true;
}


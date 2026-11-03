using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("ContactInfo", Schema = "public")]
public class ContactInfo
{
    [Key]
    public int Id { get; set; }

    [MaxLength(255)]
    public string? CompanyName { get; set; }

    [MaxLength(300)]
    public string? Address { get; set; }

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(50)]
    public string? Hotline { get; set; }

    [MaxLength(100)]
    public string? Email { get; set; }

    public string? MapEmbed { get; set; }

    public bool? IsActive { get; set; } = true;
}


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Route("api/contact-info")]
public class ContactInfoController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<ContactInfoController> _logger;

    public ContactInfoController(SmartEduDbContext context, ILogger<ContactInfoController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/contact-info
    /// Trả về thông tin liên hệ chính của trung tâm từ bảng ContactInfo
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ContactInfo>> GetContactInfo()
    {
        ContactInfo? info = null;

        try
        {
            info = await _context.ContactInfos
                .AsNoTracking()
                .Where(c => c.IsActive ?? true)
                .OrderBy(c => c.Id)
                .FirstOrDefaultAsync();

            if (info != null)
            {
                return Ok(info);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query PostgreSQL table ContactInfo. Returning fallback contact info.");
        }

        return Ok(GetDefaultSeedContactInfo());
    }

    private static ContactInfo GetDefaultSeedContactInfo()
    {
        return new ContactInfo
        {
            Id = 1,
            CompanyName = "SmartEdu Academy - Trung Tâm Bồi Dưỡng Văn Hóa & Luyện Thi",
            Address = "Số 01 Đường Số 6, P. Bình Phú, Quận 6, TP.HCM",
            Phone = "028.3876.5432",
            Hotline = "0906.716.727",
            Email = "smartedu.academy.vn@gmail.com",
            MapEmbed = "https://maps.google.com/maps?q=10.7456,106.6345&z=17&output=embed",
            IsActive = true
        };
    }
}


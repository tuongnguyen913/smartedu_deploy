using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Route("api/footer-config")]
public class FooterConfigController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<FooterConfigController> _logger;

    public FooterConfigController(SmartEduDbContext context, ILogger<FooterConfigController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/footer-config
    /// Trả về cấu hình chân trang từ bảng tbl_FooterConfig
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<TblFooterConfig>> GetFooterConfig()
    {
        TblFooterConfig? config = null;

        try
        {
            config = await _context.TblFooterConfigs
                .AsNoTracking()
                .Where(f => f.IsActive ?? true)
                .OrderBy(f => f.Id)
                .FirstOrDefaultAsync();

            if (config != null)
            {
                return Ok(config);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query PostgreSQL table tbl_FooterConfig. Returning fallback footer config.");
        }

        return Ok(GetDefaultSeedFooterConfig());
    }

    private static TblFooterConfig GetDefaultSeedFooterConfig()
    {
        return new TblFooterConfig
        {
            Id = 1,
            CompanyName = "Trung Tâm Bồi Dưỡng Văn Hóa SmartEdu Academy",
            Address = "Cơ sở 1: Số 01 Đường Số 6 / Cơ sở 2: Số 17 Đường Chợ Lớn, P. Bình Phú, Q.6, TP.HCM",
            Phone = "028.3876.5432",
            Hotline = "0906.716.727 - 0901.873.466",
            Email = "smartedu.academy.vn@gmail.com",
            Website = "https://smartedu.edu.vn",
            CopyrightText = "© 2026 SmartEdu Academy. All rights reserved.",
            IsActive = true
        };
    }
}


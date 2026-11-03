using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BranchesController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<BranchesController> _logger;

    public BranchesController(SmartEduDbContext context, ILogger<BranchesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/branches
    /// Trả về danh sách cơ sở đào tạo thỏa điều kiện IsActive = true sắp xếp theo DisplayOrder
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<Branch>>> GetBranches()
    {
        List<Branch> branches;

        try
        {
            branches = await _context.Branches
                .AsNoTracking()
                .Where(b => b.IsActive ?? true)
                .OrderBy(b => b.DisplayOrder ?? 0)
                .ThenBy(b => b.BranchId)
                .ToListAsync();

            if (branches.Count == 0)
            {
                _logger.LogInformation("Branches table is empty. Returning default seed branches from DB dump.");
                branches = GetDefaultSeedBranches();
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query PostgreSQL table Branches. Returning fallback branches data.");
            branches = GetDefaultSeedBranches();
        }

        return Ok(branches);
    }

    /// <summary>
    /// GET /api/branches/{id}
    /// Trả về thông tin chi tiết một cơ sở
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Branch>> GetBranch(int id)
    {
        try
        {
            var branch = await _context.Branches
                .AsNoTracking()
                .FirstOrDefaultAsync(b => b.BranchId == id);

            if (branch != null)
            {
                return Ok(branch);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query branch id {Id} from PostgreSQL. Using fallback data.", id);
        }

        var fallback = GetDefaultSeedBranches().FirstOrDefault(b => b.BranchId == id);
        if (fallback == null)
        {
            return NotFound(new { message = $"Không tìm thấy cơ sở với ID = {id}" });
        }

        return Ok(fallback);
    }

    private static List<Branch> GetDefaultSeedBranches()
    {
        return new List<Branch>
        {
            new Branch
            {
                BranchId = 1,
                BranchName = "Cơ sở 1 - Bình Phú",
                Address = "Số 01 Đường Số 6, Phường Bình Phú, Quận 6, TP.HCM",
                Phone = "028.3876.5432",
                Hotline = "0906.716.727",
                Email = "smartedu.academy.vn@gmail.com",
                WorkingHours = "Thứ 2 - Chủ Nhật: 07:30 - 21:00",
                GoogleMapsEmbedUrl = "https://maps.google.com/maps?q=10.7456,106.6345&z=17&output=embed",
                GoogleMapsDirectionsUrl = "https://maps.google.com/?q=10.7456,106.6345",
                Latitude = 10.7456000m,
                Longitude = 106.6345000m,
                ImageUrl = "assets/images/campus/campus-co-so-moi-khai-truong.jpg",
                DisplayOrder = 1,
                IsActive = true
            },
            new Branch
            {
                BranchId = 2,
                BranchName = "Cơ sở 2 - Chợ Lớn",
                Address = "Số 17 Đường Chợ Lớn, Phường Bình Phú, Quận 6, TP.HCM",
                Phone = "028.3876.5433",
                Hotline = "0901.873.466",
                Email = "smartedu.academy.vn@gmail.com",
                WorkingHours = "Thứ 2 - Chủ Nhật: 07:30 - 21:00",
                GoogleMapsEmbedUrl = "https://maps.google.com/maps?q=10.7482,106.6321&z=17&output=embed",
                GoogleMapsDirectionsUrl = "https://maps.google.com/?q=10.7482,106.6321",
                Latitude = 10.7482000m,
                Longitude = 106.6321000m,
                ImageUrl = "assets/images/campus/campus-co-so-2-cho-lon.jpg",
                DisplayOrder = 2,
                IsActive = true
            }
        };
    }
}


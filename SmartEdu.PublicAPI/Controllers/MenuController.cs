using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.DTOs;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<MenuController> _logger;

    public MenuController(SmartEduDbContext context, ILogger<MenuController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/menu
    /// Trả về danh sách menu thỏa điều kiện IsActive = true và OnTopMenu = true sắp xếp theo DisplayOrder
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<MenuItemDto>>> GetMenus([FromQuery] bool tree = false)
    {
        List<TblModuleArticle> items;

        try
        {
            items = await _context.TblModuleArticles
                .AsNoTracking()
                .Where(m => (m.IsActive ?? true) && (m.OnTopMenu ?? true))
                .OrderBy(m => m.DisplayOrder ?? 0)
                .ThenBy(m => m.ModuleId)
                .ToListAsync();

            if (items.Count == 0)
            {
                _logger.LogInformation("tbl_ModuleArticle is empty. Returning default seed menus.");
                items = GetDefaultSeedMenus();
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query PostgreSQL table tbl_ModuleArticle. Returning fallback menu structure.");
            items = GetDefaultSeedMenus();
        }

        if (!tree)
        {
            // Default: Return flat list so Angular buildTree can recursively reconstruct the 3-level tree
            return Ok(items.Select(MapToDto).ToList());
        }

        // Return hierarchical tree
        var dtoList = items.Select(MapToDto).ToList();
        var lookup = dtoList.ToLookup(x => x.ParentId ?? 0);

        var rootItems = lookup[0].ToList();
        foreach (var root in rootItems)
        {
            root.Children = lookup[root.ModuleId].OrderBy(c => c.DisplayOrder).ToList();
            foreach (var child in root.Children)
            {
                child.Children = lookup[child.ModuleId].OrderBy(c => c.DisplayOrder).ToList();
            }
        }

        return Ok(rootItems);
    }

    private static MenuItemDto MapToDto(TblModuleArticle m)
    {
        string? url = m.UrlFrontEnd;
        if (!string.IsNullOrEmpty(url) && (m.ParentId == 2 || url.StartsWith("/gioi-thieu/")))
        {
            var key = m.ModuleKey?.ToLowerInvariant() ?? "";
            var slug = url.Substring(url.LastIndexOf('/') + 1).ToLowerInvariant();

            if (key.Contains("story") || key.Contains("cau-chuyen") || slug.Contains("cau-chuyen"))
                url = "/gioi-thieu#section-story";
            else if (key.Contains("core") || key.Contains("gia-tri") || slug.Contains("gia-tri") || key.Contains("cot-loi"))
                url = "/gioi-thieu#section-core-values";
            else if (key.Contains("cam-ket") || key.Contains("commit") || slug.Contains("cam-ket"))
                url = "/gioi-thieu#section-commitments";
            else if (key.Contains("message") || key.Contains("thong-diep") || slug.Contains("thong-diep"))
                url = "/gioi-thieu#section-message";
            else if (key.Contains("legal") || key.Contains("phap-ly") || slug.Contains("phap-ly"))
                url = "/gioi-thieu#section-legal";
        }

        return new MenuItemDto
        {
            ModuleId = m.ModuleId,
            ModuleName = m.ModuleName ?? string.Empty,
            ModuleKey = m.ModuleKey ?? string.Empty,
            UrlFrontEnd = url,
            DisplayOrder = m.DisplayOrder ?? 0,
            IsActive = m.IsActive ?? true,
            ParentId = m.ParentId,
            OnTopMenu = m.OnTopMenu ?? true,
            Icon = m.Icon,
            IsClickable = m.IsClickable ?? true,
            TargetBlank = m.TargetBlank ?? false,
            Children = new List<MenuItemDto>()
        };
    }

    private static List<TblModuleArticle> GetDefaultSeedMenus()
    {
        return new List<TblModuleArticle>
        {
            // Level 1: Root Navigation Items (ParentId = null / 0)
            new() { ModuleId = 1, ModuleName = "Trang chủ", ModuleKey = "trang-chu", UrlFrontEnd = "/", DisplayOrder = 1, IsActive = true, OnTopMenu = true, ParentId = null, Icon = "bi bi-house-door-fill", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 2, ModuleName = "Giới thiệu", ModuleKey = "gioi-thieu", UrlFrontEnd = "/gioi-thieu", DisplayOrder = 2, IsActive = true, OnTopMenu = true, ParentId = null, Icon = "bi bi-info-circle-fill", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 3, ModuleName = "Chương trình học", ModuleKey = "chuong-trinh-hoc", UrlFrontEnd = "/chuong-trinh-hoc", DisplayOrder = 3, IsActive = true, OnTopMenu = true, ParentId = null, Icon = "bi bi-mortarboard-fill", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 4, ModuleName = "Ban giảng huấn", ModuleKey = "ban-giang-huan", UrlFrontEnd = "/ban-giang-huan", DisplayOrder = 4, IsActive = true, OnTopMenu = true, ParentId = null, Icon = "bi bi-person-workspace", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 5, ModuleName = "Tin tức", ModuleKey = "tin-tuc", UrlFrontEnd = "/tin-tuc", DisplayOrder = 5, IsActive = true, OnTopMenu = true, ParentId = null, Icon = "bi bi-newspaper", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 6, ModuleName = "Thư viện Media", ModuleKey = "thu-vien-media", UrlFrontEnd = "/thu-vien-media", DisplayOrder = 6, IsActive = true, OnTopMenu = true, ParentId = null, Icon = "bi bi-images", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 7, ModuleName = "Liên hệ", ModuleKey = "lien-he", UrlFrontEnd = "/lien-he", DisplayOrder = 7, IsActive = true, OnTopMenu = true, ParentId = null, Icon = "bi bi-envelope-fill", IsClickable = true, TargetBlank = false },

            // Level 2: Children of "Giới thiệu" (ParentId = 2) - Dropdown 2 cấp
            new() { ModuleId = 21, ModuleName = "Câu Chuyện SmartEdu", ModuleKey = "cau-chuyen-smartedu", UrlFrontEnd = "/gioi-thieu#section-story", DisplayOrder = 1, IsActive = true, OnTopMenu = true, ParentId = 2, Icon = "bi bi-book-half", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 22, ModuleName = "Hệ Giá Trị Cốt Lõi", ModuleKey = "he-gia-tri-cot-loi", UrlFrontEnd = "/gioi-thieu#section-core-values", DisplayOrder = 2, IsActive = true, OnTopMenu = true, ParentId = 2, Icon = "bi bi-compass-fill", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 23, ModuleName = "4 Cam Kết Vàng", ModuleKey = "4-cam-ket-vang", UrlFrontEnd = "/gioi-thieu#section-commitments", DisplayOrder = 3, IsActive = true, OnTopMenu = true, ParentId = 2, Icon = "bi bi-shield-fill-check", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 24, ModuleName = "Thông Điệp Giảng Huấn", ModuleKey = "thong-diep-giang-huan", UrlFrontEnd = "/gioi-thieu#section-message", DisplayOrder = 4, IsActive = true, OnTopMenu = true, ParentId = 2, Icon = "bi bi-chat-quote-fill", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 25, ModuleName = "Pháp Lý & Công Khai", ModuleKey = "phap-ly-cong-khai", UrlFrontEnd = "/gioi-thieu#section-legal", DisplayOrder = 5, IsActive = true, OnTopMenu = true, ParentId = 2, Icon = "bi bi-file-earmark-text-fill", IsClickable = true, TargetBlank = false },

            // Level 2: Columns of "Chương trình học" (ParentId = 3) - Mega Menu Cấp 2
            new() { ModuleId = 31, ModuleName = "Khối THCS (Lớp 6 - 9)", ModuleKey = "khoi-thcs-lop-6-9", UrlFrontEnd = "/chuong-trinh-hoc?cap=cap2", DisplayOrder = 1, IsActive = true, OnTopMenu = true, ParentId = 3, Icon = "bi bi-book", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 32, ModuleName = "Khối THPT & Luyện Thi", ModuleKey = "khoi-thpt-luyen-thi", UrlFrontEnd = "/chuong-trinh-hoc?cap=cap3", DisplayOrder = 2, IsActive = true, OnTopMenu = true, ParentId = 3, Icon = "bi bi-mortarboard", IsClickable = true, TargetBlank = false },

            // Level 3: Subjects under "Khối THCS" (ParentId = 31) - Mega Menu Cấp 3
            new() { ModuleId = 311, ModuleName = "Bồi Dưỡng Toán Lớp 6 - 9", ModuleKey = "toan-6-9", UrlFrontEnd = "/chuong-trinh-hoc?cap=cap2", DisplayOrder = 1, IsActive = true, OnTopMenu = true, ParentId = 31, Icon = "bi bi-calculator", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 312, ModuleName = "Ngữ Văn & Kỹ Năng Làm Văn", ModuleKey = "van-6-9", UrlFrontEnd = "/chuong-trinh-hoc?cap=cap2", DisplayOrder = 2, IsActive = true, OnTopMenu = true, ParentId = 31, Icon = "bi bi-pencil-square", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 313, ModuleName = "Khoa Học Tự Nhiên (Lý - Hóa - Sinh)", ModuleKey = "khtn-6-9", UrlFrontEnd = "/chuong-trinh-hoc?cap=cap2", DisplayOrder = 3, IsActive = true, OnTopMenu = true, ParentId = 31, Icon = "bi bi-lightning-charge", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 314, ModuleName = "Tiếng Anh SGK & Nâng Cao", ModuleKey = "anh-6-9", UrlFrontEnd = "/chuong-trinh-hoc?cap=cap2", DisplayOrder = 4, IsActive = true, OnTopMenu = true, ParentId = 31, Icon = "bi bi-translate", IsClickable = true, TargetBlank = false },

            // Level 3: Subjects under "Khối THPT & Luyện Thi" (ParentId = 32) - Mega Menu Cấp 3
            new() { ModuleId = 321, ModuleName = "Luyện Thi Tuyển Sinh 10 Công Lập", ModuleKey = "ts10-cong-lap", UrlFrontEnd = "/chuong-trinh-hoc?cap=tuyensinh10", DisplayOrder = 1, IsActive = true, OnTopMenu = true, ParentId = 32, Icon = "bi bi-trophy", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 322, ModuleName = "Luyện Thi Vào Lớp 10 Chuyên", ModuleKey = "ts10-chuyen", UrlFrontEnd = "/chuong-trinh-hoc?cap=tuyensinh10", DisplayOrder = 2, IsActive = true, OnTopMenu = true, ParentId = 32, Icon = "bi bi-star", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 323, ModuleName = "Toán - Lý - Hóa - Văn - Anh 10-12", ModuleKey = "thpt-10-12", UrlFrontEnd = "/chuong-trinh-hoc?cap=cap3", DisplayOrder = 3, IsActive = true, OnTopMenu = true, ParentId = 32, Icon = "bi bi-journal-bookmark", IsClickable = true, TargetBlank = false },
            new() { ModuleId = 324, ModuleName = "Luyện Thi ĐGNL & Tốt Nghiệp THPT", ModuleKey = "dgnl-thptqg", UrlFrontEnd = "/chuong-trinh-hoc?cap=daihoc", DisplayOrder = 4, IsActive = true, OnTopMenu = true, ParentId = 32, Icon = "bi bi-award", IsClickable = true, TargetBlank = false }
        };
    }
}

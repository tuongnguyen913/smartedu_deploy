using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.DTOs;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowAngular")]
public class FacultyController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<FacultyController> _logger;

    public FacultyController(SmartEduDbContext context, ILogger<FacultyController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/faculty/header
    /// Truy vấn bảng tbl_HomepageSection lấy bản ghi có SectionCode = 'FACULTY_HEADER'
    /// </summary>
    [HttpGet("header")]
    public async Task<ActionResult<FacultyHeaderDto>> GetHeader()
    {
        try
        {
            var section = await _context.TblHomepageSections
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.SectionCode == "FACULTY_HEADER");

            if (section != null)
            {
                return Ok(new FacultyHeaderDto
                {
                    SubTitle = !string.IsNullOrWhiteSpace(section.SubTitle)
                        ? section.SubTitle
                        : "ĐỘI NGŨ SƯ PHẠM TINH HOA — TẬN TÂM ĐỒNG HÀNH",
                    Title = !string.IsNullOrWhiteSpace(section.Title)
                        ? section.Title
                        : "Ban Giảng Huấn SmartEdu",
                    Content = !string.IsNullOrWhiteSpace(section.Content)
                        ? section.Content
                        : "Quy tụ đội ngũ Thạc sĩ, Cử nhân Sư phạm xuất sắc từ Trường ĐH Sư Phạm TP.HCM, mang đến phương pháp giảng dạy hiện đại, kiên nhẫn bồi dưỡng tri thức và khơi nguồn đam mê học tập cho từng học sinh.",
                    IsActive = section.IsActive ?? true
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query tbl_HomepageSection for FACULTY_HEADER.");
        }

        return Ok(new FacultyHeaderDto
        {
            SubTitle = "ĐỘI NGŨ SƯ PHẠM TINH HOA — TẬN TÂM ĐỒNG HÀNH",
            Title = "Ban Giảng Huấn SmartEdu",
            Content = "Quy tụ đội ngũ Thạc sĩ, Cử nhân Sư phạm xuất sắc từ Trường ĐH Sư Phạm TP.HCM, mang đến phương pháp giảng dạy hiện đại, kiên nhẫn bồi dưỡng tri thức và khơi nguồn đam mê học tập cho từng học sinh.",
            IsActive = true
        });
    }

    /// <summary>
    /// GET /api/faculty/teachers
    /// Truy vấn bảng Teachers trực tiếp từ CSDL PostgreSQL
    /// </summary>
    [HttpGet("teachers")]
    public async Task<ActionResult<FacultyTeachersResponseDto>> GetTeachers()
    {
        List<Teacher> teachers = new();

        try
        {
            teachers = await _context.Teachers
                .AsNoTracking()
                .Where(t => t.IsActive ?? true)
                .OrderBy(t => t.DisplayOrder ?? 0)
                .ThenBy(t => t.TeacherId)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query PostgreSQL table Teachers.");
        }

        // Thống kê danh sách Bộ môn (distinct cột Subject) cùng số lượng giáo viên tương ứng
        var subjects = teachers
            .Where(t => !string.IsNullOrWhiteSpace(t.Subject))
            .GroupBy(t => t.Subject!.Trim())
            .Select(g => new SubjectCountDto
            {
                Subject = g.Key,
                Count = g.Count()
            })
            .OrderByDescending(s => s.Count)
            .ThenBy(s => s.Subject)
            .ToList();

        var response = new FacultyTeachersResponseDto
        {
            TotalTeachers = teachers.Count,
            Subjects = subjects,
            Teachers = teachers
        };

        return Ok(response);
    }

    /// <summary>
    /// GET /api/faculty/list
    /// Alias tương thích
    /// </summary>
    [HttpGet("list")]
    public async Task<ActionResult<FacultyTeachersResponseDto>> GetList()
    {
        return await GetTeachers();
    }
}

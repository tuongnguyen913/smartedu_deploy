using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.DTOs;
using SmartEdu.PublicAPI.Models;
using System.Text.RegularExpressions;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowAngular")]
public class EnrollmentsController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<EnrollmentsController> _logger;
    private static readonly Regex PhoneRegex = new(@"^(03|05|07|08|09)+[0-9]{8}$", RegexOptions.Compiled);

    public EnrollmentsController(SmartEduDbContext context, ILogger<EnrollmentsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// POST /api/enrollments
    /// Đăng ký đánh giá năng lực đầu vào (Học thử 0đ)
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateEnrollment([FromBody] EnrollmentCreateDto dto)
    {
        if (dto == null)
        {
            return BadRequest(new EnrollmentResponseDto
            {
                Success = false,
                Message = "Dữ liệu đăng ký không hợp lệ."
            });
        }

        // 1. Kiểm tra họ tên
        if (string.IsNullOrWhiteSpace(dto.ParentName))
        {
            return BadRequest(new EnrollmentResponseDto
            {
                Success = false,
                Message = "Vui lòng nhập họ và tên phụ huynh / học sinh."
            });
        }

        // 2. Kiểm tra số điện thoại
        if (string.IsNullOrWhiteSpace(dto.PhoneNumber))
        {
            return BadRequest(new EnrollmentResponseDto
            {
                Success = false,
                Message = "Vui lòng nhập số điện thoại liên hệ (Zalo)."
            });
        }

        var cleanPhone = dto.PhoneNumber.Trim().Replace(" ", "").Replace(".", "").Replace("-", "");
        // Hỗ trợ chuẩn hóa nếu bắt đầu bằng +84 hoặc 84
        if (cleanPhone.StartsWith("+84"))
        {
            cleanPhone = "0" + cleanPhone[3..];
        }
        else if (cleanPhone.StartsWith("84") && cleanPhone.Length == 11)
        {
            cleanPhone = "0" + cleanPhone[2..];
        }

        if (!PhoneRegex.IsMatch(cleanPhone))
        {
            return BadRequest(new EnrollmentResponseDto
            {
                Success = false,
                Message = "Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số (đầu số 03, 05, 07, 08, 09)."
            });
        }

        try
        {
            var enrollment = new Enrollment
            {
                ParentName = dto.ParentName.Trim(),
                PhoneNumber = cleanPhone,
                GradeLevel = string.IsNullOrWhiteSpace(dto.GradeLevel) ? null : dto.GradeLevel.Trim(),
                BranchId = dto.BranchId,
                CourseId = dto.CourseId,
                StudentName = string.IsNullOrWhiteSpace(dto.StudentName) ? null : dto.StudentName.Trim(),
                Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim(),
                LearningNeed = string.IsNullOrWhiteSpace(dto.LearningNeed) ? null : dto.LearningNeed.Trim(),
                SourcePage = string.IsNullOrWhiteSpace(dto.SourcePage) ? "PlacementTestModal" : dto.SourcePage.Trim(),
                Status = "Pending",
                CreatedDate = DateTime.Now
            };

            await _context.Enrollments.AddAsync(enrollment);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Lưu đăng ký học thử thành công! ID: {EnrollmentId}, Khách: {ParentName}, SĐT: {PhoneNumber}",
                enrollment.EnrollmentId, enrollment.ParentName, enrollment.PhoneNumber);

            return Ok(new EnrollmentResponseDto
            {
                Success = true,
                Message = "Đăng ký thành công! SmartEdu sẽ liên hệ với bạn sớm nhất.",
                EnrollmentId = enrollment.EnrollmentId
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi xảy ra khi lưu đơn đăng ký học thử vào PostgreSQL.");
            return StatusCode(500, new EnrollmentResponseDto
            {
                Success = false,
                Message = "Đã xảy ra lỗi máy chủ trong quá trình xử lý đơn đăng ký. Vui lòng liên hệ hotline trực tiếp."
            });
        }
    }
}


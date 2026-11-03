using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình DbContext kết nối PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Host=localhost;Port=5432;Database=SmartEduDb;Username=postgres;Password=duykhanh";

builder.Services.AddDbContext<SmartEduDbContext>(options =>
    options.UseNpgsql(connectionString));

// 2. Cấu hình CORS toàn diện cho phép mọi origin từ Angular localhost (4200, 127.0.0.1,...)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(origin =>
              {
                  if (string.IsNullOrWhiteSpace(origin)) return false;
                  var uri = new Uri(origin);
                  return uri.Host == "localhost" || uri.Host == "127.0.0.1";
              })
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .SetPreflightMaxAge(TimeSpan.FromHours(1));
    });

    options.AddPolicy("AllowAngular", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
              {
                  if (string.IsNullOrWhiteSpace(origin)) return false;
                  var uri = new Uri(origin);
                  return uri.Host == "localhost" || uri.Host == "127.0.0.1";
              })
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .SetPreflightMaxAge(TimeSpan.FromHours(1));
    });
});

// 3. Đăng ký Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "SmartEdu Public API",
        Version = "v1",
        Description = "Public Web API cho Website SmartEdu Academy kết nối PostgreSQL"
    });
});

var app = builder.Build();

// 4. HTTP Request Pipeline theo đúng chuẩn Microsoft
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmartEdu Public API v1");
        c.RoutePrefix = string.Empty; // Swagger at root URL
    });
}

// Bắt buộc gọi UseRouting trước UseCors
app.UseRouting();

// Kích hoạt CORS middleware
app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

app.Run();

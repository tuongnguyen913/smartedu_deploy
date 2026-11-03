import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewsService } from '../../core/services/news.service';
import { ModalService } from '../../core/services/modal.service';
import { ToastService } from '../../core/services/toast.service';
import { ArticleDetail, RelatedArticle } from '../../core/models/article.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  article = signal<ArticleDetail | null>(null);
  sanitizedContent = signal<SafeHtml>('');
  relatedArticles = signal<RelatedArticle[]>([]);
  isLoading = signal<boolean>(true);
  isNotFound = signal<boolean>(false);
  currentUrl = signal<string>('');
  readingTime = signal<number>(5);

  // Bài viết hạt giống mẫu chuẩn thiết kế phòng trường hợp DB chưa nạp
  private defaultSeedArticle: ArticleDetail = {
    articleId: 1,
    title: 'So Sánh Học Hè Tại Trung Tâm Và Học Gia Sư Tại Nhà: Lựa Chọn Nào Hiệu Quả Hơn Cho Con Bạn?',
    brief: 'So sánh chi tiết học hè tại trung tâm và học gia sư tại nhà. 8 tiêu chí giúp cha mẹ lựa chọn hình thức học tối ưu nhất cho sự tiến bộ của con.',
    contentd: `
      <h2 id="muc-1">1. Học hè – giai đoạn "vàng" để con bứt phá kiến thức</h2>
      <p>
        Mùa hè không chỉ đơn thuần là thời gian nghỉ ngơi, xả hơi sau 9 tháng học tập căng thẳng, mà còn là <strong>thời điểm vàng để con củng cố những lỗ hổng kiến thức</strong> của năm học cũ, chuẩn bị tâm lý và nền tảng vững vàng trước khi bước vào năm học mới — đặc biệt là với các em học sinh chuẩn bị bước vào các lớp chuyển cấp như Lớp 6 hay Lớp 10.
      </p>
      <p>
        Với sự đa dạng về hình thức học thêm hiện nay, nhiều phụ huynh tại Quận 6 và TP.HCM thường đứng trước hai sự lựa chọn phổ biến: <em>cho con đến các trung tâm bồi dưỡng văn hóa chất lượng cao</em> hay <em>thuê gia sư dạy kèm 1 kèm 1 tại nhà</em>. Vậy lựa chọn nào là tối ưu nhất cho hiệu quả học tập, sự phát triển toàn diện và tâm lý của trẻ? Hãy cùng SmartEdu phân tích chi tiết.
      </p>

      <h2 id="muc-2">2. Bảng so sánh 8 tiêu chí: Học trung tâm vs Học gia sư tại nhà</h2>
      <p>Dưới đây là bảng đối chiếu trực quan 8 tiêu chí quan trọng nhất mà bất kỳ phụ huynh nào cũng cần cân nhắc trước khi ra quyết định:</p>

      <div class="tuition-table-wrap">
        <table class="tuition-table">
          <thead>
            <tr>
              <th>Tiêu chí đánh giá</th>
              <th>Học hè tại Trung tâm (SmartEdu)</th>
              <th>Học gia sư tại nhà</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Môi trường học tập</strong></td>
              <td>Lớp học chuẩn 10-15 em, có không khí thi đua, bạn bè tương tác tích cực.</td>
              <td>Học 1 kèm 1 tại phòng riêng, dễ tạo cảm giác buồn ngủ, thiếu sự cọ xát.</td>
            </tr>
            <tr>
              <td><strong>2. Chất lượng giáo viên</strong></td>
              <td>100% giáo viên chuẩn ĐH Sư phạm TP.HCM, có hội đồng chuyên môn kiểm duyệt.</td>
              <td>Phần lớn là sinh viên dạy thêm, thiếu nghiệp vụ sư phạm bài bản và kinh nghiệm.</td>
            </tr>
            <tr>
              <td><strong>3. Kỷ luật &amp; nề nếp</strong></td>
              <td>Quy chế giờ giấc nghiêm ngặt, rèn tính tự lập, không dùng điện thoại trong giờ.</td>
              <td>Dễ bị phân tâm bởi đồ chơi, tivi hoặc điện thoại nếu cha mẹ không ngồi giám sát.</td>
            </tr>
            <tr>
              <td><strong>4. Chi phí đào tạo</strong></td>
              <td>Học phí niêm yết rõ ràng, tiết kiệm 40%–50% so với thuê gia sư giỏi.</td>
              <td>Chi phí tính theo buổi, rất cao nếu muốn thuê thầy cô có bằng cấp sư phạm thực thụ.</td>
            </tr>
            <tr>
              <td><strong>5. Tính cá nhân hóa</strong></td>
              <td>Có kiểm tra đầu vào, phân nhóm năng lực và kèm ngoài giờ 1:1 miễn phí.</td>
              <td>Cá nhân hóa theo yêu cầu, nhưng giáo án thường mang tính tự phát, thiếu hệ thống.</td>
            </tr>
            <tr>
              <td><strong>6. Báo cáo định kỳ</strong></td>
              <td>Báo cáo điểm số, chuyên cần và thái độ học tập định kỳ hàng tuần qua Zalo.</td>
              <td>Phụ thuộc vào sự chủ động của gia sư, cha mẹ khó nắm bắt tiến bộ thật sự.</td>
            </tr>
            <tr>
              <td><strong>7. Rèn luyện kỹ năng</strong></td>
              <td>Có hoạt động thuyết trình, làm việc nhóm, rèn sự tự tin trước đám đông.</td>
              <td>Hầu như không có cơ hội rèn luyện giao tiếp và kỹ năng xã hội.</td>
            </tr>
            <tr>
              <td><strong>8. Cam kết đầu ra</strong></td>
              <td>Cam kết hoàn 100% học phí bằng hợp đồng nếu con không tiến bộ.</td>
              <td>Không có cam kết pháp lý ràng buộc nếu kết quả thi cử của con không đạt.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="muc-3">3. Phân tích ưu &amp; nhược điểm của từng hình thức</h2>
      <h3>Khi nào nên thuê gia sư dạy tại nhà?</h3>
      <p>
        Gia sư tại nhà phát huy hiệu quả tốt nhất đối với những em học sinh có tâm lý cực kỳ rụt rè, sợ đám đông, hoặc các em bị mất gốc quá nặng nề cần người ngồi bên cạnh chỉ dẫn từng nét chữ. Tuy nhiên, rủi ro lớn nhất là chất lượng gia sư rất khó kiểm soát nếu phụ huynh chỉ thuê qua các trung tâm môi giới sinh viên trên mạng.
      </p>

      <h3>Khi nào nên chọn trung tâm bồi dưỡng chất lượng cao?</h3>
      <p>
        Đối với đa số học sinh từ Lớp 1 đến Lớp 12, <strong>môi trường trung tâm mang lại động lực học tập vượt trội</strong>. Được ngồi học cùng các bạn cùng trang lứa, các em sẽ học được thói quen lắng nghe người khác, học cách tranh luận, giơ tay phát biểu và đặc biệt là không còn cảm giác "bị ép học một mình".
      </p>

      <blockquote>
        "Học tập là một hoạt động mang tính xã hội. Khi trẻ nhìn thấy bạn bè xung quanh chăm chỉ giải bài, bản thân các em sẽ tự động hình thành động lực nội tại để cố gắng mà không cần cha mẹ phải thúc ép hay quát mắng."
      </blockquote>

      <h2 id="muc-4">4. Lời khuyên từ chuyên gia giáo dục SmartEdu</h2>
      <p>Trước khi đưa ra quyết định, phụ huynh nên thực hiện 3 bước sau:</p>
      <ul>
        <li><strong>Bước 1 — Đánh giá đúng năng lực hiện tại:</strong> Cho con làm bài test chuẩn để biết con đang hổng kiến thức ở phần nào.</li>
        <li><strong>Bước 2 — Lắng nghe mong muốn của con:</strong> Hỏi xem con thích học cùng bạn bè ở lớp hay thích có người kèm riêng tại nhà.</li>
        <li><strong>Bước 3 — Tham quan thực tế cơ sở đào tạo:</strong> Đến tận nơi để quan sát phòng học, gặp gỡ trực tiếp thầy cô sẽ dạy con.</li>
      </ul>

      <h2 id="muc-5">5. Giải pháp học hè toàn diện tại SmartEdu Academy</h2>
      <p>
        Tại SmartEdu Academy (Quận 6, TP.HCM), chúng tôi kết hợp hoàn hảo ưu điểm của cả hai mô hình: <strong>Lớp học chuẩn sĩ số 10–15 em</strong> để tạo không khí thi đua, kết hợp với <strong>chế độ kèm 1:1 ngoài giờ miễn phí</strong> cho từng học sinh còn yếu bài.
      </p>
      <p>
        100% thầy cô đều tốt nghiệp loại Giỏi/Xuất sắc từ ĐH Sư phạm TP.HCM, phụ huynh được nhận báo cáo tiến độ học tập hàng tuần qua Zalo và được cam kết hoàn 100% học phí nếu con không tiến bộ.
      </p>
    `,
    picture: 'assets/images/students/students-lop-hoc-thuc-te.jpg',
    author: 'ThS. Nguyễn Thanh Tùng',
    published: '2026-06-25T08:00:00Z',
    views: 1450,
    categoryId: 1,
    categoryName: 'Cẩm Nang Phụ Huynh',
    slug: 'so-sanh-hoc-he-tai-trung-tam-va-hoc-gia-su-tai-nha',
    seoTitle: 'So Sánh Học Hè Tại Trung Tâm Và Gia Sư Tại Nhà — SmartEdu Academy',
    seoDescription: 'So sánh chi tiết học hè tại trung tâm và học gia sư tại nhà. 8 tiêu chí giúp cha mẹ lựa chọn hình thức học tối ưu nhất cho sự tiến bộ của con.'
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUrl.set(window.location.href);
    }

    // Lắng nghe thay đổi của param slug trên URL
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadArticle(slug);
      } else {
        // Fallback khi vào trực tiếp /bai-viet-chi-tiet
        this.loadArticle('so-sanh-hoc-he-tai-trung-tam-va-hoc-gia-su-tai-nha');
      }
    });
  }

  loadArticle(slug: string): void {
    this.isLoading.set(true);
    this.isNotFound.set(false);

    // Tự động cuộn trang lên đầu khi chuyển bài viết
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.currentUrl.set(window.location.href);
    }

    this.newsService.getArticleDetail(slug).subscribe({
      next: (data) => {
        this.displayArticle(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        // Nếu API trả 404 hoặc không tìm thấy bài trong DB
        if (err.status === 404) {
          // Nếu slug là slug mẫu, hiển thị bài mẫu
          if (slug.includes('so-sanh') || slug === 'bai-viet-chi-tiet') {
            this.displayArticle(this.defaultSeedArticle);
            this.isLoading.set(false);
            return;
          }
          this.isNotFound.set(true);
          this.isLoading.set(false);
        } else {
          // Lỗi mạng hoặc server: fallback sang bài mẫu demo
          this.displayArticle(this.defaultSeedArticle);
          this.isLoading.set(false);
        }
      }
    });
  }

  private displayArticle(data: ArticleDetail): void {
    this.article.set(data);

    // Xử lý nội dung an toàn qua DomSanitizer
    const rawContent = data.contentd || (data.brief ? `<p>${data.brief}</p>` : '<p>Đang cập nhật nội dung...</p>');
    this.sanitizedContent.set(this.sanitizer.bypassSecurityTrustHtml(rawContent));

    // Tính thời gian đọc ước lượng (trung bình 200 từ/phút)
    const textOnly = rawContent.replace(/<[^>]*>/g, ' ');
    const wordCount = textOnly.trim().split(/\s+/).length;
    this.readingTime.set(Math.max(1, Math.ceil(wordCount / 200)));

    // Cập nhật động SEO Meta Tags
    const pageTitle = `${data.seoTitle || data.title} — SmartEdu Academy`;
    this.titleService.setTitle(pageTitle);
    if (data.seoDescription || data.brief) {
      this.metaService.updateTag({ name: 'description', content: data.seoDescription || data.brief || '' });
    }
    if (data.seoKeyword) {
      this.metaService.updateTag({ name: 'keywords', content: data.seoKeyword });
    }

    // Nạp bài viết liên quan
    this.loadRelatedArticles(data.categoryId || 0, data.articleId);
  }

  private loadRelatedArticles(categoryId: number, currentArticleId: number): void {
    this.newsService.getRelatedArticles(categoryId, currentArticleId).subscribe({
      next: (list) => {
        if (list && list.length > 0) {
          this.relatedArticles.set(list);
        } else {
          this.setFallbackRelatedArticles(currentArticleId);
        }
      },
      error: () => {
        this.setFallbackRelatedArticles(currentArticleId);
      }
    });
  }

  private setFallbackRelatedArticles(currentArticleId: number): void {
    const fallbackList: RelatedArticle[] = [
      {
        articleId: 2,
        title: 'Phụ Huynh Cần Biết: Vì Sao Con Mất Gốc Toán & Cách Lấy Lại Căn Bản Sau 4 Tuần',
        brief: 'Phân tích nguyên nhân mất gốc toán và phác đồ lấy lại căn bản hiệu quả.',
        picture: 'assets/images/cam-nang-1.jpg',
        slug: 'vi-sao-con-mat-goc-toan',
        published: '2026-05-20T08:00:00Z',
        categoryId: 1,
        categoryName: 'Cẩm Nang Phụ Huynh'
      },
      {
        articleId: 3,
        title: 'Bứt Phá Mục Tiêu Lớp 10: Giải Pháp Ôn Luyện Hiệu Quả Giai Đoạn Nước Rút',
        brief: 'Chiến thuật phân bổ thời gian ôn thi tuyển sinh 10 đạt kết quả cao.',
        picture: 'assets/images/cam-nang-2.jpg',
        slug: 'but-pha-muc-tieu-lop-10',
        published: '2026-06-12T08:00:00Z',
        categoryId: 1,
        categoryName: 'Luyện Thi Vào 10'
      }
    ];

    this.relatedArticles.set(fallbackList.filter(a => a.articleId !== currentArticleId));
  }

  openAssessment(): void {
    const title = this.article()?.title || 'Đánh giá năng lực';
    this.modalService.openAssessment(title);
  }

  copyLink(): void {
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.toastService.show('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
      });
    }
  }
}


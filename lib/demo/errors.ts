export function messageForDemoSessionError(status: number, body: Record<string, unknown>): string {
  const code = typeof body.code === 'string' ? body.code : '';
  const serverMsg = typeof body.message === 'string' ? body.message.trim() : '';

  if (code === 'captcha_failed' || (status === 403 && code !== 'forbidden_partner_key' && code !== 'forbidden_origin')) {
    return 'Xác minh captcha chưa thành công. Anh/chị thử lại giúp nhé.';
  }
  if (code === 'forbidden_origin' || code === 'forbidden_partner_key') {
    return 'Demo chưa được mở cho domain này. Anh/chị liên hệ UpMySalon giúp nhé.';
  }
  if (code === 'demo_concurrent_session_limit' || code.startsWith('demo_rate_limited')) {
    return serverMsg || 'Demo đang bận hoặc anh/chị vừa gọi thử liên tục. Đợi một chút rồi thử lại.';
  }
  if (serverMsg) return serverMsg;
  if (status >= 500) {
    return 'Chưa kết nối được demo lúc này. Anh/chị thử lại sau một lát nhé.';
  }
  return 'Không bắt đầu được cuộc gọi thử. Anh/chị thử lại giúp nhé.';
}

export function microphoneErrorMessageVi(error: unknown): string {
  if (typeof window !== 'undefined' && !window.isSecureContext) {
    return 'Cần mở trang bằng HTTPS (hoặc localhost) để dùng micro. Anh/chị mở lại bằng Safari hoặc Chrome giúp nhé.';
  }

  const name =
    error instanceof DOMException
      ? error.name
      : typeof error === 'object' && error !== null && 'name' in error
        ? String((error as { name?: unknown }).name ?? '')
        : '';

  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') {
    return 'Trình duyệt đang chặn micro. Anh/chị bật quyền micro cho trang này trong cài đặt trình duyệt, rồi thử lại.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'Không tìm thấy micro. Anh/chị kiểm tra thiết bị rồi thử lại.';
  }
  if (name === 'NotReadableError' || name === 'TrackStartError') {
    return 'Micro đang được app khác dùng. Anh/chị đóng app đó rồi thử lại.';
  }

  return 'Cần cho phép micro để gọi thử. Anh/chị bật micro rồi thử lại giúp nhé.';
}

export function inAppBrowserHintVi(): string {
  return 'Anh/chị đang mở trong trình duyệt trong app (Facebook/Instagram…). Micro thường bị chặn — hãy bấm ⋯ rồi chọn Mở bằng Safari hoặc Chrome.';
}

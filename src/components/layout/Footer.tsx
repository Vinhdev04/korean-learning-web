

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <span>
            {isEn 
              ? '© 2026 Korean Learning. All rights reserved. Copyright by Vinhdev'
              : '© 2026 Hàn Quốc Học. Tất cả quyền được bảo lưu. Copyright by Vinhdev'}
          </span>
          <div className="flex gap-6">
            <Link href={`/${locale}`} className="hover:text-koreanRed transition-colors">
              {isEn ? 'Privacy Policy' : 'Chính sách bảo mật'}
            </Link>
            <Link href={`/${locale}`} className="hover:text-koreanRed transition-colors">
              {isEn ? 'Terms of Use' : 'Điều khoản sử dụng'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';

    const handleI18nRouting = createMiddleware(routing);
    const response = handleI18nRouting(req);

    if (response.headers.get('location')) {
        return response;
    }

    const rootDomain = process.env.NODE_ENV === 'development'
        ? 'localhost:3000'
        : 'yourdomain.com';

    let subdomain = hostname.replace(`.${rootDomain}`, '').replace(`${rootDomain}`, '');

    if (hostname.includes('localhost') && hostname !== 'localhost:3000') {
        subdomain = hostname.split('.')[0];
    }

    let routeGroup = 'customer';
    if (subdomain.toLowerCase() === 'repairshop') {
        routeGroup = 'repairShop';
    }

    const nextIntlRewrite = response.headers.get('x-middleware-rewrite');

    let pathToString = nextIntlRewrite
        ? new URL(nextIntlRewrite).pathname
        : url.pathname;

    const newUrl = new URL(url);
    newUrl.pathname = `/${routeGroup}${pathToString}`;

    return NextResponse.rewrite(newUrl, {
        headers: response.headers
    });
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
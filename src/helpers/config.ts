
export const apiUrl = (process.env.NODE_ENV === 'production')
        ? 'http://localhost:3000'
        : 'http://localhost:3000'

export function localKey(index: string): string { return 'TAGNET-' + index; }

export function getUser(): any { return localStorage.getItem('TAGNET-user') }

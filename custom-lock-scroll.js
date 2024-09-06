export function customLockScroll(state: boolean, slug = 'default') {
    const slugLocked = `_page-locked-from-${slug}`;
    let slugList = window.slugList || [];

    if (!state) {
        slugList = slugList.filter(item => item !== slugLocked);
    } else {
        slugList = [...slugList, slugLocked];
    }

    window.slugList = Array.from(new Set(slugList));

    if (state && window.isLockPageScroll | !state && window.slugList.length) {
        return;
    }

    window.isLockPageScroll = state;

    const windowPositionY = window.scrollY;
    const delta = state
        ? window.innerWidth - document.documentElement.clientWidth
        : '';

    document.documentElement.style.setProperty('--scroll-compensator-width', `${delta}px`);
    document.body.style.overflow = state ? 'hidden' : '';
    document.body.style.paddingRight = state ? `${delta}px` : '';
    document.body.style.position = state ? 'fixed' : '';
    document.body.style.width = state ? '100%' : '';
    document.body.style.height = state ? '100%' : '';

    if (!state) {
        const bodyStyles = window.getComputedStyle(document.body);
        const top = Number.parseInt(bodyStyles.getPropertyValue('top'), 10) * -1;

        window.scrollTo({
            top,
            behavior: 'instant',
        });
    }

    document.body.style.top = state ? -windowPositionY + 'px' : '';
}

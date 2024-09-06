export function customLockScroll(state, slug = 'default') {
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

export function scrollByLinkAnchors(link: string) {
    if (!link) {
        return;
    }

    const url = new URL(link, window.location.origin);
    const block = url?.hash ? document.querySelector(url.hash) : null;

    if (!block) {
        return;
    }

    block.scrollIntoView({ behavior: 'smooth' });
}

export function scrollToBlock(block, withHeaderHeight = true, offset = 0) {
    if (!block || !(block instanceof HTMLElement)) {
        return;
    }

    const headerHeight = withHeaderHeight ? getValueFromStyleString('--header-height') : 0;
    const marcialHeaderHeight = withHeaderHeight ? getValueFromStyleString('--marcial-header-height') : 0;
    const marcialHeaderBottomNav = withHeaderHeight ? getValueFromStyleString('--marcial-header-bottom-nav-height') : 0;

    const { top } = block.getBoundingClientRect();

    const resultTop = top - (headerHeight || (marcialHeaderHeight + marcialHeaderBottomNav) || 0) + window.scrollY - offset;

    window.scrollTo({
        top: resultTop,
        behavior: 'smooth',
    });
}

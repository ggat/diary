export default function useDetectScrollToBottom(cb) {
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            cb?.();
        }
    })
}
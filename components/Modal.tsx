'use client'
import {useCallback, useRef, useEffect, MouseEventHandler, ReactNode} from 'react'
import { useRouter } from 'next/navigation'

export default function Modal({ children }: { children: ReactNode }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    return (
        <div
            ref={overlay}
            className="fixed z-10 left-0 top-0 w-full h-full mx-auto bg-black/60"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="absolute w-full h-full flex justify-center items-center p-6"
            >
                {children}
            </div>
        </div>
    )
}

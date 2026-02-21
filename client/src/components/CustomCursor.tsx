'use client';

import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        const onMouseLeave = () => setIsHidden(true);
        const onMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                width: isPointer ? '60px' : '40px',
                height: isPointer ? '60px' : '40px',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid var(--primary)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)',
                transition: 'width 0.3s, height 0.3s, background-color 0.3s',
                display: isHidden ? 'none' : 'block',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(2px)',
            }}
        >
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
            }} />
        </div>
    );
};

export default CustomCursor;

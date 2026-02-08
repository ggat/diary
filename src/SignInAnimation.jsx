export default function SignInAnimation() {
    return (
        <svg
            className="sign-in-anim"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="anim-glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* ── Rotating orbit rings ── */}
            <g filter="url(#anim-glow)">
                <circle
                    cx="100" cy="100" r="90"
                    stroke="#0e9076" strokeWidth="0.5" strokeOpacity="0.25"
                    strokeDasharray="8 14"
                >
                    <animateTransform
                        attributeName="transform" type="rotate"
                        from="0 100 100" to="360 100 100"
                        dur="45s" repeatCount="indefinite"
                    />
                </circle>
                <circle
                    cx="100" cy="100" r="70"
                    stroke="#0e9076" strokeWidth="0.5" strokeOpacity="0.18"
                    strokeDasharray="4 18"
                >
                    <animateTransform
                        attributeName="transform" type="rotate"
                        from="360 100 100" to="0 100 100"
                        dur="30s" repeatCount="indefinite"
                    />
                </circle>
                <circle
                    cx="100" cy="100" r="50"
                    stroke="#0e9076" strokeWidth="0.5" strokeOpacity="0.12"
                    strokeDasharray="2 10"
                >
                    <animateTransform
                        attributeName="transform" type="rotate"
                        from="0 100 100" to="360 100 100"
                        dur="18s" repeatCount="indefinite"
                    />
                </circle>
            </g>

            {/* ── Tick marks at cardinal points ── */}
            <g stroke="#0e9076" strokeWidth="0.5" opacity="0.3">
                <line x1="100" y1="5" x2="100" y2="12" />
                <line x1="195" y1="100" x2="188" y2="100" />
                <line x1="100" y1="195" x2="100" y2="188" />
                <line x1="5" y1="100" x2="12" y2="100" />
            </g>

            {/* ── Orbiting dots ── */}
            <g filter="url(#anim-glow)">
                <circle r="2.5" fill="#0e9076" opacity="0.9">
                    <animateMotion
                        dur="45s" repeatCount="indefinite"
                        path="M100,10 A90,90 0 1,1 99.99,10"
                    />
                </circle>
                <circle r="2" fill="#0e9076" opacity="0.7">
                    <animateMotion
                        dur="30s" repeatCount="indefinite"
                        path="M100,30 A70,70 0 1,0 99.99,30"
                    />
                </circle>
                <circle r="1.5" fill="#0e9076" opacity="0.8">
                    <animateMotion
                        dur="18s" repeatCount="indefinite"
                        path="M100,50 A50,50 0 1,1 99.99,50"
                    />
                </circle>
            </g>

            {/* ── Central open book ── */}
            <g transform="translate(100, 100)" filter="url(#anim-glow)">
                <g className="book-breathe">
                    {/* Left page */}
                    <path
                        d="M-3,-20 L-3,20 L-24,17 L-24,-17 Z"
                        stroke="#0e9076" strokeWidth="1"
                        fill="rgba(14,144,118,0.04)"
                    />
                    {/* Right page */}
                    <path
                        d="M3,-20 L3,20 L24,17 L24,-17 Z"
                        stroke="#0e9076" strokeWidth="1"
                        fill="rgba(14,144,118,0.04)"
                    />
                    {/* Spine */}
                    <line
                        x1="0" y1="-22" x2="0" y2="22"
                        stroke="#0e9076" strokeWidth="1.5" opacity="0.8"
                    />
                    {/* Page fold curves */}
                    <path
                        d="M-3,-20 C-1,-18 1,-18 3,-20"
                        stroke="#0e9076" strokeWidth="0.7" fill="none" opacity="0.5"
                    />
                    <path
                        d="M-3,20 C-1,18 1,18 3,20"
                        stroke="#0e9076" strokeWidth="0.7" fill="none" opacity="0.5"
                    />

                    {/* Writing lines — left page */}
                    <line x1="-20" y1="-12" x2="-7" y2="-12" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="0s" />
                        <animate attributeName="x2" values="-20;-7;-7;-20" dur="3.5s" repeatCount="indefinite" begin="0s" />
                    </line>
                    <line x1="-20" y1="-6" x2="-9" y2="-6" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="0.4s" />
                        <animate attributeName="x2" values="-20;-9;-9;-20" dur="3.5s" repeatCount="indefinite" begin="0.4s" />
                    </line>
                    <line x1="-20" y1="0" x2="-7" y2="0" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
                        <animate attributeName="x2" values="-20;-7;-7;-20" dur="3.5s" repeatCount="indefinite" begin="0.8s" />
                    </line>
                    <line x1="-20" y1="6" x2="-11" y2="6" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="1.2s" />
                        <animate attributeName="x2" values="-20;-11;-11;-20" dur="3.5s" repeatCount="indefinite" begin="1.2s" />
                    </line>

                    {/* Writing lines — right page */}
                    <line x1="7" y1="-12" x2="20" y2="-12" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="1.6s" />
                        <animate attributeName="x2" values="7;20;20;7" dur="3.5s" repeatCount="indefinite" begin="1.6s" />
                    </line>
                    <line x1="7" y1="-6" x2="18" y2="-6" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="2.0s" />
                        <animate attributeName="x2" values="7;18;18;7" dur="3.5s" repeatCount="indefinite" begin="2.0s" />
                    </line>
                    <line x1="7" y1="0" x2="20" y2="0" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="2.4s" />
                        <animate attributeName="x2" values="7;20;20;7" dur="3.5s" repeatCount="indefinite" begin="2.4s" />
                    </line>
                    <line x1="7" y1="6" x2="16" y2="6" stroke="#0e9076" strokeWidth="0.8">
                        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" repeatCount="indefinite" begin="2.8s" />
                        <animate attributeName="x2" values="7;16;16;7" dur="3.5s" repeatCount="indefinite" begin="2.8s" />
                    </line>
                </g>
            </g>

            {/* ── Floating particles ── */}
            <g fill="#0e9076">
                <circle cx="30" cy="30" r="1">
                    <animate attributeName="cy" values="30;20;30" dur="7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="7s" repeatCount="indefinite" />
                </circle>
                <circle cx="170" cy="35" r="1.2">
                    <animate attributeName="cy" values="35;25;35" dur="5.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="25" cy="165" r="0.8">
                    <animate attributeName="cy" values="165;155;165" dur="6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx="175" cy="170" r="1">
                    <animate attributeName="cy" values="170;160;170" dur="4.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="18" cy="95" r="0.7">
                    <animate attributeName="cx" values="18;12;18" dur="8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="182" cy="105" r="0.9">
                    <animate attributeName="cx" values="182;188;182" dur="6.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6.5s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* ── Corner brackets (cyberpunk detail) ── */}
            <g stroke="#0e9076" strokeWidth="0.5" opacity="0.2">
                <polyline points="15,20 10,20 10,25" fill="none" />
                <polyline points="185,20 190,20 190,25" fill="none" />
                <polyline points="15,180 10,180 10,175" fill="none" />
                <polyline points="185,180 190,180 190,175" fill="none" />
            </g>
        </svg>
    );
}

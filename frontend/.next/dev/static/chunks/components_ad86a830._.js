(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/animated-counter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedCounter",
    ()=>AnimatedCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AnimatedCounter({ end, suffix = "", decimals = 0, duration = 2000, className = "" }) {
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const hasAnimated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedCounter.useEffect": ()=>{
            if (hasAnimated.current) return;
            hasAnimated.current = true;
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval({
                "AnimatedCounter.useEffect.timer": ()=>{
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(start);
                    }
                }
            }["AnimatedCounter.useEffect.timer"], 16);
            return ({
                "AnimatedCounter.useEffect": ()=>clearInterval(timer)
            })["AnimatedCounter.useEffect"];
        }
    }["AnimatedCounter.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: [
            count.toFixed(decimals),
            suffix
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/animated-counter.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(AnimatedCounter, "1TuziHNW0xgzottPqCvCokMEOf0=");
_c = AnimatedCounter;
var _c;
__turbopack_context__.k.register(_c, "AnimatedCounter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/typewriter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Typewriter",
    ()=>Typewriter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Typewriter({ text, speed = 70, cursor = "▌", loop = true, deleteSpeed = 50, delay = 1400, className }) {
    _s();
    const [displayText, setDisplayText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [textArrayIndex, setTextArrayIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const textArray = Array.isArray(text) ? text : [
        text
    ];
    const currentText = textArray[textArrayIndex] || "";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Typewriter.useEffect": ()=>{
            if (!currentText) return;
            const timeout = setTimeout({
                "Typewriter.useEffect.timeout": ()=>{
                    if (!isDeleting) {
                        if (currentIndex < currentText.length) {
                            setDisplayText({
                                "Typewriter.useEffect.timeout": (prev)=>prev + currentText[currentIndex]
                            }["Typewriter.useEffect.timeout"]);
                            setCurrentIndex({
                                "Typewriter.useEffect.timeout": (prev)=>prev + 1
                            }["Typewriter.useEffect.timeout"]);
                        } else {
                            setTimeout({
                                "Typewriter.useEffect.timeout": ()=>setIsDeleting(true)
                            }["Typewriter.useEffect.timeout"], delay);
                        }
                    } else {
                        if (displayText.length > 0) {
                            setDisplayText({
                                "Typewriter.useEffect.timeout": (prev)=>prev.slice(0, -1)
                            }["Typewriter.useEffect.timeout"]);
                        } else {
                            setIsDeleting(false);
                            setCurrentIndex(0);
                            setTextArrayIndex({
                                "Typewriter.useEffect.timeout": (prev)=>(prev + 1) % textArray.length
                            }["Typewriter.useEffect.timeout"]);
                        }
                    }
                }
            }["Typewriter.useEffect.timeout"], isDeleting ? deleteSpeed : speed);
            return ({
                "Typewriter.useEffect": ()=>clearTimeout(timeout)
            })["Typewriter.useEffect"];
        }
    }["Typewriter.useEffect"], [
        currentIndex,
        isDeleting,
        currentText,
        speed,
        deleteSpeed,
        delay,
        displayText
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `bg-gradient-to-r from-[#0EA5E9] via-[#06B6D4] to-[#0EA5E9] bg-clip-text text-transparent ${className}`,
        children: [
            displayText,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-cyan-400 animate-pulse ml-1",
                children: cursor
            }, void 0, false, {
                fileName: "[project]/components/ui/typewriter.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/typewriter.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(Typewriter, "p87dQqAt9kwjvtFjU6ANjx4NS2o=");
_c = Typewriter;
var _c;
__turbopack_context__.k.register(_c, "Typewriter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/rain-animation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RainAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function RainAnimation() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rainDropsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RainAnimation.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const resizeCanvas = {
                "RainAnimation.useEffect.resizeCanvas": ()=>{
                    const parent = canvas.parentElement;
                    if (parent) {
                        canvas.width = parent.offsetWidth;
                        canvas.height = parent.offsetHeight;
                    }
                }
            }["RainAnimation.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            const initRain = {
                "RainAnimation.useEffect.initRain": ()=>{
                    rainDropsRef.current = [];
                    const dropCount = window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 80 : 120;
                    for(let i = 0; i < dropCount; i++){
                        rainDropsRef.current.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height - canvas.height,
                            length: Math.random() * 15 + 8,
                            speed: Math.random() * 2 + 1,
                            opacity: Math.random() * 0.1 + 0.05
                        });
                    }
                }
            }["RainAnimation.useEffect.initRain"];
            const drawRain = {
                "RainAnimation.useEffect.drawRain": (drop)=>{
                    ctx.beginPath();
                    ctx.moveTo(drop.x, drop.y);
                    ctx.lineTo(drop.x, drop.y + drop.length);
                    ctx.strokeStyle = `rgba(248, 250, 252, ${drop.opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }["RainAnimation.useEffect.drawRain"];
            const updateRain = {
                "RainAnimation.useEffect.updateRain": ()=>{
                    rainDropsRef.current.forEach({
                        "RainAnimation.useEffect.updateRain": (drop)=>{
                            drop.y += drop.speed;
                            if (drop.y > canvas.height) {
                                drop.y = -drop.length;
                                drop.x = Math.random() * canvas.width;
                            }
                        }
                    }["RainAnimation.useEffect.updateRain"]);
                }
            }["RainAnimation.useEffect.updateRain"];
            const animate = {
                "RainAnimation.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    updateRain();
                    rainDropsRef.current.forEach(drawRain);
                    animationRef.current = requestAnimationFrame(animate);
                }
            }["RainAnimation.useEffect.animate"];
            initRain();
            animate();
            return ({
                "RainAnimation.useEffect": ()=>{
                    window.removeEventListener('resize', resizeCanvas);
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                }
            })["RainAnimation.useEffect"];
        }
    }["RainAnimation.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 pointer-events-none z-0",
        style: {
            background: 'transparent'
        }
    }, void 0, false, {
        fileName: "[project]/components/rain-animation.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(RainAnimation, "syzXRUIiuXZSncotd4eX2WQaYh4=");
_c = RainAnimation;
var _c;
__turbopack_context__.k.register(_c, "RainAnimation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/hero-particles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroParticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function HeroParticles() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroParticles.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (window.matchMedia && window.matchMedia("(max-width: 640px)").matches) return; // disable on small screens
            const canvas = ref.current;
            const ctx = canvas.getContext("2d");
            let dpr = Math.max(1, window.devicePixelRatio || 1);
            let width = 0;
            let height = 0;
            function resize() {
                const rect = canvas.getBoundingClientRect();
                width = Math.max(1, Math.floor(rect.width));
                height = Math.max(1, Math.floor(rect.height));
                canvas.width = Math.floor(width * dpr);
                canvas.height = Math.floor(height * dpr);
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }
            const PARTICLE_COUNT = 150 // many raindrops
            ;
            const particles = [];
            function initParticles() {
                particles.length = 0;
                for(let i = 0; i < PARTICLE_COUNT; i++){
                    const x = Math.random() * width;
                    const y = -Math.random() * height // start above the top so rain falls in from top
                    ;
                    const w = 0.3 + Math.random() * 1.0 // smaller, narrower
                    ;
                    const h = 3 + Math.random() * 8 // shorter elongated height
                    ;
                    const vy = 40 + Math.random() * 80 // slightly slower fall
                    ;
                    const vx = (Math.random() - 0.5) * 6;
                    const alpha = 0.05 + Math.random() * 0.10;
                    const tilt = (Math.random() - 0.5) * 0.25;
                    particles.push({
                        x,
                        y,
                        vx,
                        vy,
                        w,
                        h,
                        alpha,
                        tilt
                    });
                }
            }
            let last = performance.now();
            function draw(now) {
                const dt = Math.min(50, now - last) / 1000;
                last = now;
                ctx.clearRect(0, 0, width, height);
                for (let p of particles){
                    // update
                    p.y += p.vy * dt;
                    p.x += p.vx * dt;
                    // respawn when off bottom
                    if (p.y - p.h > height) {
                        p.y = -10 - Math.random() * 60;
                        p.x = Math.random() * width;
                    }
                    const a = p.alpha;
                    // draw smaller elongated white raindrop (ellipse rotated slightly)
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.tilt);
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255,255,255,${a})`;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = `rgba(255,255,255,${Math.min(1, a * 0.9)})`;
                    ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
                rafRef.current = requestAnimationFrame(draw);
            }
            // initialize
            resize();
            initParticles();
            rafRef.current = requestAnimationFrame(draw);
            const ro = new ResizeObserver({
                "HeroParticles.useEffect": ()=>{
                    dpr = Math.max(1, window.devicePixelRatio || 1);
                    resize();
                    initParticles();
                }
            }["HeroParticles.useEffect"]);
            ro.observe(canvas);
            return ({
                "HeroParticles.useEffect": ()=>{
                    if (rafRef.current) cancelAnimationFrame(rafRef.current);
                    ro.disconnect();
                }
            })["HeroParticles.useEffect"];
        }
    }["HeroParticles.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: ref,
        className: "absolute inset-0 w-full h-full pointer-events-none -z-10",
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/components/hero-particles.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(HeroParticles, "GgrdUftfP1zTCaK8N93SH5U+kLU=");
_c = HeroParticles;
var _c;
__turbopack_context__.k.register(_c, "HeroParticles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_ad86a830._.js.map
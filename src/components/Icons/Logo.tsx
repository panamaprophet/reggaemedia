import React from "react";

interface Props {
    color?: string,
    size?: number,
}

export const Logo = ({ color = '#000', size = 32 }: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size + size / 2}
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeWidth="28.222"
        preserveAspectRatio="xMidYMid"
        version="1.2"
        viewBox="0 0 10500 14800"
    >
        <defs className="ClipPathGroup">
            <clipPath id="presentation_clip_path" clipPathUnits="userSpaceOnUse">
                <path d="M0 0H10500V14800H0z"></path>
            </clipPath>
            <clipPath clipPathUnits="userSpaceOnUse">
                <path d="M10 14H10489V14785H10z"></path>
            </clipPath>
        </defs>
        <defs className="EmbeddedBulletChars">
            <path
                d="M580 1141l583-570L580 0-4 571l584 570z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M8 1128h1129V0H8v1128z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M174 0l428 739-428 742 1282-742L174 0zm1184 739L309 1346l350-607h699z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M2015 739L1276 0H717l543 543H174v393h1086l-543 545h557l741-742z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M0-2c-7 16-16 29-25 39l381 530c-94 256-141 385-141 387 0 25 13 38 40 38 9 0 21-2 34-5 21 4 42 12 65 25l27-13 111-251 280 301 64-25 24 25c21-10 41-24 62-43-36-69-87-143-152-222-1-1-60-68-176-200l180-361c0-27-21-55-63-84l16-20c-10-29-28-43-55-43-31 0-102 102-215 305L164-76c-22-34-53-51-92-51-42 0-63 17-64 51C1-67-2-52-2-32c0 9 1 19 2 30z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M285-33C182-33 111 30 74 156c-22 72-33 177-33 315 0 78 14 145 41 201 34 71 87 106 158 106 53 0 88-31 106-94l23-176c8-64 28-97 59-98l735 706c11 11 33 17 66 17 42 0 63-15 63-46V965c0-36-10-64-30-84L442 47C390-6 338-33 285-33z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M813 0C632 0 489 54 383 161 276 268 223 411 223 592s53 324 160 431c106 107 249 161 430 161 179 0 323-54 432-161 108-107 162-251 162-431s-54-324-162-431C1136 54 992 0 813 0z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M346 457c-73 0-137 26-191 78-54 51-81 114-81 188 0 73 27 136 81 188s118 78 191 78 134-26 185-79c51-51 77-114 77-187 0-75-25-137-76-188-50-52-112-78-186-78z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M-4 459h1139v147H-4V459z"
                transform="scale(.00049 -.00049)"
            ></path>
            <path
                d="M173 740c0 163 58 303 173 419 116 115 255 173 419 173 163 0 302-58 418-173 116-116 174-256 174-419s-58-303-174-418c-116-116-255-174-418-174-164 0-303 58-419 174-115 115-173 255-173 418z"
                transform="scale(.00049 -.00049)"
            ></path>
        </defs>
        <g className="SlideGroup">
            <g>
                <g className="Slide" clipPath="url(#presentation_clip_path)">
                    <g className="Page">
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M1038 10356H2817V12627H1038z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M1587 10837l70-52 39 37 31-52 47 60 69-52 132 29-85 402s371 55 448-282c78-336-363-269-433-262-69 8-673 53-673 53l46-60-46-23 170-67-85-30 108-67-85-60s596-82 898-45c301 38 649 232 564 703s-557 464-765 471c-209 8-271 45-271 45s-341 1025-387 1040c-47 15-39-164-39-164s-31 105-70 119c-38 15-23-157-23-157l-108 150 23-127-124 105s109-547 240-966 309-748 309-748z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M1826 11591H2353V12576H1826z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M1826 11607l387-15 139 881-69-14-23 51-93-22-85 51-116-37-16 73c-39-7-124-968-124-968z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2520 10372H4231V12526H2520z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2520 12525l1022-156-8-139-46-8c30-41-101-74-101-74l147-81-16-58-448 41 193-450 464-123-23-74 39-41c-47-41 46-98 46-98l-15-49 77-74-464 25 124-360 595-115 54-57 70-8-16-90-123-41 85-41-70-33 39-49-1129 123 23 74-54 24 23 49c-38 58 93 90 93 90l-511 1392 31 123-101 278z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M3900 10356H5314V12480H3900z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M4851 11307l93-48c46 56 85 8 85 8 23 48 70 0 70 0l46 72s202-354 163-612c-39-257-217-386-418-370s-642 201-874 1015c-233 813-100 1144 294 1103 394-40 688-418 742-587s62-339 62-339l-719 89s-62 56-70 81c-7 24 78 40 78 40l-116 80h131l-77 49 93 8-85 88 355-40s-162 241-402 145c-240-97 132-814 224-1040 93-225 232-354 348-314 116 41-23 572-23 572z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5241 10356H6704V12507H5241z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6436 11329l54 8s240-495 209-635-147-346-379-346-581 107-875 866c-293 760-270 1230 62 1279 333 50 658-297 720-462s201-396 124-437-325-8-434 0c-108 8-193 17-193 41 0 25 38 33 38 33l-61 42 100 24-162 58v140l301-33s-77 256-263 231c-185-24-131-255 93-784 224-528 550-784 566-578 15 206-171 512-171 512l55-9 77-132-31 132 54-16 39 49c46-41 77 17 77 17z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M6358 10356H7883V12533H6358z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M7403 11346l-248 33 108-371 39-32 77-40s16 72 55 32l15 88 46-88-92 378zm394-894l-108 16-109-40-85-72-54 64-69-48-101 64-85-8-54-40-774 2031 62-32 54 48 69-73h85s16 65 47 0l69 57 280-645h263l-178 701 23 57 116-121 62 64 38-80 55 64 46-89 23 121 70-32 340-1934-85-73z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.PolyPolygonShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M7825 10372H9419V12528H7825z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M9418 10726l-703 126-124 353 464-33-77 67 62 25-109 67 124 51-54 160-510 110-171 429 642-101-31 51h124l-70 42 132 25-201 135 154 50-139 76-1075 168-31-126 434-1532-116 8 85-76-85-42-70-50 31-160 1005-177 62 143 85-33v50l77 42 85 152z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2029 12996H2994V13561H2029z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2844 13559c-11 0-20-9-20-20l-19-214c0-4-3-8-6-9-2 0-3-1-4-1-2 0-5 2-7 3l-180 186c-3 3-6 5-11 5l-88 16c-1 1-2 1-3 1-8 0-15-5-19-12l-106-246c-1-3-4-5-8-6h-1c-3 0-6 2-8 5l-178 274c-4 5-10 9-17 9h-120c-7 0-14-4-17-10-4-6-4-13-1-19l224-441c4-7 11-11 18-11h37c2 0 5-1 6-3l72-64c4-4 8-6 13-6 2 0 3 1 4 1 6 1 11 5 14 10l156 304c1 3 4 5 7 5h1c3 0 6-1 8-4l189-236c2-3 6-6 11-7l96-24h5c4 0 7 1 11 3 4 3 7 8 8 13l81 473c1 6-1 12-5 18-4 4-9 7-15 7h-128z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M3741 12969H4305V13588H3741z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M3761 13587c-5 0-10-2-14-6-5-4-7-11-6-18l72-382c1-3 0-7-3-9-1-2-4-3-7-3h-2l-36 7c-1 1-3 1-4 1-5 0-11-2-15-6-4-5-6-12-4-19l24-96c2-8 8-14 16-15l466-72h1c7 0 12 1 15 4 5 4 7 10 7 15v97c0 9-7 17-16 19l-256 53c-3 0-6 3-7 7l-24 85c-1 3 0 7 3 10 2 2 4 3 7 3 1 0 2-1 3-1l166-60c2-1 4-1 6-1 5 0 10 2 14 5 5 5 8 12 6 19l-18 81c-1 7-6 12-13 14l-179 60c-4 1-6 5-6 9l-3 56c0 3 2 6 4 8s4 2 6 2h3l262-83c2 0 4-1 6-1 6 0 12 3 16 8l48 65c4 5 5 12 3 19-2 6-8 11-15 12l-522 112c-1 1-3 1-4 1z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5012 12986H5684V13571H5012z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5408 13205c-50 0-102 11-129 17-4 1-6 4-7 8l-44 164c-1 3 0 6 2 8 2 3 4 4 7 4 7 1 15 1 24 1 73 0 246-12 257-121 2-23-3-41-14-53-17-19-49-28-96-28zm-200 365c-99 0-177-13-180-14-5-1-10-4-13-8s-4-10-3-15l79-445-8-71c-1-10 5-18 13-21 1-1 27-10 52-10 16 0 29 3 38 10 2 1 4 2 6 2 1 0 2 0 3-1l30-10c2 0 5-1 7-1 4 0 8 2 11 4 6 4 9 10 9 16v32c0 5 3 9 9 10 225 35 369 74 396 107 20 23 28 61 24 102-5 47-30 139-147 231-69 54-178 82-326 82z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5012 12986H5684V13571H5012z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5408 13205c-50 0-102 11-129 17-4 1-6 4-7 8l-44 164c-1 3 0 6 2 8 2 3 4 4 7 4 7 1 15 1 24 1 73 0 246-12 257-121 2-23-3-41-14-53-17-19-49-28-96-28zm-200 365c-99 0-177-13-180-14-5-1-10-4-13-8s-4-10-3-15l79-445-8-71c-1-10 5-18 13-21 1-1 27-10 52-10 16 0 29 3 38 10 2 1 4 2 6 2 1 0 2 0 3-1l30-10c2 0 5-1 7-1 4 0 8 2 11 4 6 4 9 10 9 16v32c0 5 3 9 9 10 225 35 369 74 396 107 20 23 28 61 24 102-5 47-30 139-147 231-69 54-178 82-326 82z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M6340 13165H6631V13583H6340z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6358 13574c-6-1-12-4-15-9-4-5-4-12-2-18l64-177 81-193c3-7 10-12 18-12h105c7 0 13 3 16 8 4 5 5 12 3 18l-121 376c-3 9-10 15-19 15-6 0-130-8-130-8z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M6460 12929H6723V13102H6460z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6512 13101c-6 0-12-2-16-7l-32-40c-5-7-6-17-1-24l40-64c2-4 6-7 10-9 1 0 79-28 136-28 33 0 56 10 66 30s6 36 0 45c-7 11-20 20-40 26-2 0-5 2-6 4-1 3-1 7-1 9 2 4 2 9 0 13-2 6-8 11-14 13l-137 32h-5z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M7289 13017H7950V13621H7289z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M7700 13191c-2 0-3 0-5 1l-4 2c-2 1-4 3-5 5l-73 177c-1 3-1 7 2 10 1 2 4 4 8 4l119-10c3-1 6-2 8-5 1-2 2-5 1-8l-41-168c-1-3-3-6-6-7-1-1-3-1-4-1zm76 429c-10-1-19-9-20-19l-6-93c0-6-5-10-10-10h-194c-2 0-4 1-6 2l-129 107c-4 3-8 5-13 5-3-1-90-9-90-9-7 0-13-4-16-10-3-7-3-14 1-20l330-538c3-6 9-9 16-10 0 0 135-8 138-8 8 0 16 6 18 14l97 313 56 252c2 6 0 12-4 17-3 5-9 7-15 7h-153z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M7289 13017H7950V13621H7289z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M7700 13191c-2 0-3 0-5 1l-4 2c-2 1-4 3-5 5l-73 177c-1 3-1 7 2 10 1 2 4 4 8 4l119-10c3-1 6-2 8-5 1-2 2-5 1-8l-41-168c-1-3-3-6-6-7-1-1-3-1-4-1zm76 429c-10-1-19-9-20-19l-6-93c0-6-5-10-10-10h-194c-2 0-4 1-6 2l-129 107c-4 3-8 5-13 5-3-1-90-9-90-9-7 0-13-4-16-10-3-7-3-14 1-20l330-538c3-6 9-9 16-10 0 0 135-8 138-8 8 0 16 6 18 14l97 313 56 252c2 6 0 12-4 17-3 5-9 7-15 7h-153z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M3298 1016H5977V4151H3298z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5186 2203l-258-447 458 259-200 188zm787 360c-47-660-599-1230-881-1289-283-58-483 141-483 141s-494-399-623-399c-130 0-224 23-235 117l-12 94s-200 12-271 188c-70 177 0 353 0 353l47 400s71-129 142-200c70-70 388-141 752 577 365 718-317 706-553 412-235-294-176-247-176-247v-329s-141 82-153 129-23 94-23 94-130-59-188 82c-59 142 35 318 258 530 173 163 247 282 224 446-24 165 34 488 34 488s71-676 777-782c707-105 1411-147 1364-805z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5986 2491H6732V3234H5986z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6127 2491s11 141-36 306c-48 165-105 206-105 206s517 354 693 183c115-112 24-342-129-495s-423-200-423-200z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5796 1355H6730V2677H5796z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6092 2287s175 29 363 146c155 97 273 242 273 242s-72-719-436-1083c-365-365-471-224-494-130-25 95 176 494 211 600 36 106 83 225 83 225z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M3843 3121H6540V6172H3843z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5398 3361c328-99 590-240 590-240s145 128 212 164c152 82 339 100 339 100s-610 288-986 465c-377 176-638 382-849 699-170 254-318 636-318 871 0 412 85 714 2 747-131 53-578-535-543-1265 36-729 240-952 565-1211 235-188 671-233 988-330z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M4500 1954H7405V6670H4500z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M4892 6667c-144 36-587-582-293-1417 294-836 1134-1257 1411-1400 422-218 801-341 883-812 83-470-60-794-36-935 23-141 389-358 495 312s118 1482-647 1905c-765 424-1412 683-1647 1212s-188 632-153 788c47 212 81 323-13 347z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5058 3173H7831V7010H5058z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5209 7008c159 16 93-300 224-659 100-274 390-570 990-782 600-211 1091-672 1233-1064 188-517 234-1053 83-1294-79-125-189 94-259 365-71 271-128 712-963 1088s-1247 870-1365 1211-96 559-84 759c12 199 30 364 141 376z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M1854 2435H3868V5863H1854z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M3866 5862s-150-300-162-911c-8-423 12-600 12-600s-422-452-598-652c-177-200-212-247-212-247s165-235 141-506c-23-271-247-542-376-495-130 47 23 200 35 319 12 117 24 235-47 247-71 11-71-224-153-366-82-141-164-259-247-200-82 59 35 200 83 330 47 130 105 342 11 342s-94-294-188-425c-94-129-271-211-307-94-35 119 154 189 190 424 35 236-59 353-71 577-12 223 388 717 647 1023 258 305 1242 1234 1242 1234z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M1604 6225H4834V9738H1604z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M4176 6225l657 665s-188 294-851 1317c-231 356-725 1035-807 1070-82 36-440 48-498 95-59 47-107 376-260 364s-82-282-35-364c47-83 58-165 0-153l-59 11s-94 436-259 447c-164 12-106-176-47-317s130-212 59-235c-71-24-141 153-212 305-70 153-82 224-176 212s-118-235-24-435 277-535 406-559c129-23 482 12 601-117 117-130 1505-2306 1505-2306z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M3100 5625H3833V7074H3100z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M3831 6539l-396 534s-377-331-330-801 282-647 282-647l435 359s-153 129-130 305c24 177 139 250 139 250z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2816 6383H2832V6574H2816z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2831 6573c-6-64-11-127-15-190 1 63 7 127 15 190z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5344 5137H8150V7761H5344z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5344 7349s17-588 252-895c236-306 366-470 778-588 411-117 699-346 826-482 164-176 208-247 208-247s283 294 424 459c141 164 317 435 317 435s-247 153-564 70c-318-82-553-447-553-447l-106 130s529 823-141 1094-953-400-953-400l-47 82s189 471 189 730-213 470-213 470l-417-411z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5880 7013H7152V8369H5880z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6080 7013s94 200 23 470c-70 272-223 401-223 401s422 676 892 429c472-247 379-701 356-830-24-129-131-411-131-411s-294 152-564 82c-271-71-353-141-353-141z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M7162 6176H8463V7454H7162z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M7373 6201s48 353-47 506c-94 153-164 247-164 247s106 295 341 424c236 130 554 71 695-35s388-377 188-824-177-329-177-329-129 176-388 129c-258-47-448-118-448-118z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M7009 7483H8169V8842H7009z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M7338 7483s-12 401-94 589-235 306-235 306 299 764 906 329c469-335 140-1089 140-1089s-140 100-387 18c-246-82-330-153-330-153z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M8213 7033H8821V8373H8213z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M8592 7033s-37 217-115 327c-88 123-264 185-264 185s42 394 194 615c129 188 329 212 329 212s120-406 73-747c-47-342-217-592-217-592z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M6048 8365H7129V9262H6048z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6809 8436s57 182 154 306c72 93 165 118 165 118s-117 418-554 400-545-471-522-648c24-176 44-247 44-247s132 150 313 153c273 5 400-82 400-82z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M7925 8250H8716V9213H7925z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M8328 8250s70 115 152 174 235 59 235 59-94 389-247 589-306 164-412 23-130-235-130-235 154-35 260-247c106-213 142-363 142-363z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M7126 8941H8145V9731H7126z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M7821 8941s24 162 105 266c94 120 217 138 217 138s-298 315-570 373c-270 60-435-129-446-294-12-164 82-446 82-446s163 123 339 76c178-47 273-113 273-113z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M6139 9353H7209V9956H6139z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M6975 9353s-36 188 11 306c47 117 222 170 222 170s-423 130-728 125c-238-5-341-59-341-59s0-295 258-413c259-117 578-129 578-129z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M5111 8426H6245V9863H5111z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5903 8427s-34 326 13 503c47 176 328 440 328 440s-163 101-222 253c-59 154-59 237-59 237s-530 35-706-248c-177-283-193-596-47-824 245-382 693-361 693-361z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M3311 8883H5224V9803H3311z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5223 9801s-190-100-261-265-81-288-81-288l-1129-365c-28 64-99 162-178 356-74 181-263 521-263 521l1912 41z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M3874 7954H5105V9078H3874z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M4892 9077s13-158 84-276c70-117 128-159 128-159l-763-688-467 747 1018 376z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M4450 7025H5958V8490H4450z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M5221 8489s143-111 272-158c144-53 216-55 464-77L4951 7025l-500 788 770 676z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2774 5782H3041V7060H2774z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2853 5805c-13 114-24 228-36 342 23-6 46-12 68-18 1-104 8-202 35-304-22 4-45 8-67 12-53 400-174 849 58 1215 10 15 74-1 70-18-43-179-53-362-96-541-3-16-71 1-68 18 36 171 86 334 154 494 7 17 74-4 68-18-88-237-143-479-177-729-2-15-71 0-68 18 34 251 88 492 177 729 23-6 46-12 68-18-66-161-118-324-154-494-22 6-45 12-68 18 43 179 52 363 94 541 23-6 47-12 70-18-233-364-113-810-61-1209 3-18-62-4-67 12-29 105-35 202-36 310 0 13 67 1 68-18 12-114 23-228 36-342 1-11-66-4-68 18z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2770 5712H2995V7082H2770z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2818 5799c-22 82-42 163-48 247 23-2 47-3 70-5 5-106 26-201 69-299-23 0-45-1-68-2-59 454-114 896 83 1325 14 31 82 11 68-18-195-424-139-864-81-1311 4-36-58-26-68-2-46 103-68 199-73 312-2 37 68 27 70-5 6-84 26-165 47-247 9-34-61-26-69 5z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M1836 6227H1846V6338H1836z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M1841 6336c1-36 2-73 4-109-3 15-5 30-9 45 1 22 3 43 5 64z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2421 6398H2440V6792H2421z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2426 6428c-1-10-1-20-2-30-5 124-5 247 10 370 0 3 1 7 1 9 1 5 2 9 4 14-17-122-19-242-13-363z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2551 6649H2583V6784H2551z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2551 6650v57c9 26 20 52 31 76-4-12-7-25-10-38-9-32-15-64-21-95z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M1576 4613H3306V8320H1576z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M1630 6877c-26-149-32-293-20-435-2 188 31 376 70 562-13-37-24-76-32-114-8 1-16-2-18-13zm35-740v-1-1 2zm162 735c5 44 11 88 18 131 2 9-3 16-9 19l-9-150zm-163-412c3-127 14-254 32-380l17 3c-6 25-11 51-14 77l19-76 7 2c-21 272-30 552 16 823-51-195-72-397-57-596-9 49-15 98-20 147zm1209 202c7 26 14 53 22 79l-174 47c-6-20-11-39-16-59 3 20 6 41 9 61l-149 42c-4-9-9-19-12-27 0 9 0 20 1 30l-142 38c-2-13-4-27-6-40-24-77-42-155-53-234 6 94 18 187 38 280l-80 22c-19-109-29-218-31-327-4-20-8-41-12-61-1 130 10 260 32 391l-100 27c-3-11-6-23-9-34l3 36-107 29c-40-151-60-303-62-455-3 39-6 78-7 117 1 95 6 190 20 285 4 21 8 42 13 63l-50 13c-4-27-7-55-10-82-4-20-8-41-12-61 5 48 11 96 19 144l-39 11c-1-4-1-7-2-11-9 6-24 5-28-9-7-21-13-43-20-64 4 31 7 63 11 94l-37 10c-28-131-41-263-42-393-11-60-20-120-26-181-2 16-3 32-4 48-2 22-2 44-3 66l-28-460 207 44c-11 85-20 170-23 255 3 68 10 136 19 204 0-151 12-303 20-456l84 18c-16 96-26 193-27 290 9 68 21 136 35 203-12-97-19-194-10-291 3-41 10-82 18-122 1-25 3-50 5-75l81 17c-4 46-7 93-8 139 3-46 6-92 10-139l102 22c-7 48-14 96-18 144 2 20 5 40 8 60 3-68 10-135 18-203l94 20-3 21c-6 73-8 148-5 221 2-80 6-161 11-241l123 26c-7 86-7 172-2 259 1-41 3-83 6-125-1-44 1-88 5-132l130 27c-1 11-3 21-3 31 3 21 7 42 11 63 0-30 2-61 4-91l78 16c3 31 6 62 11 93-1-30 0-60 0-91l63 14 17-135c5 160 17 320 32 479zm-1131 484c-30-124-56-257-75-395 4 57 8 115 14 171 10 61 23 120 37 178-7-15-14-31-20-47-7-44-12-87-17-131-22-136-33-276-35-415 3 82 11 163 21 244v-13c15 134 48 264 101 384 8 18-14 34-26 24zm1197-228l-13-81c7 19 15 37 23 56 5 11-1 21-10 25zm-24-558c15-435 307-882 307-882l-834-864s-791 358-812 1752c-25 1630 988 1953 988 1953l740-1053s-414-170-389-906z"
                                ></path>
                            </g>
                        </g>
                        <g className="com.sun.star.drawing.ClosedBezierShape">
                            <g>
                                <path
                                    fill="none"
                                    d="M2229 6280H2243V6562H2229z"
                                    className="BoundingBox"
                                ></path>
                                <path
                                    fill={color}
                                    d="M2231 6320c-2 80-3 161 2 241-2-74 1-149 9-223-2-18-5-38-7-57-1 13-3 25-4 39z"
                                ></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

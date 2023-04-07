import React from "react";

interface Props {
    color?: string,
    size?: number,
}

export const Logo = ({ color = '#000', size = 32 }: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size + size / 3} fill="none" viewBox="0 0 361 543">
        <path fill={color} fill-rule="evenodd" d="m23.82 422.879 2.993-2.248 1.663 1.605 1.33-2.251 1.996 2.573 2.992-2.25 5.653 1.285-3.658 17.287s15.962 2.328 19.288-12.143c3.326-14.468-15.63-11.575-18.623-11.252-2.991.322-28.931 2.248-28.931 2.248l1.994-2.571-1.994-.965 7.315-2.893-3.657-1.287 4.654-2.893-3.657-2.573s25.606-3.536 38.576-1.928c12.97 1.607 27.934 9.967 24.276 30.225-3.658 20.257-23.943 19.935-32.921 20.257-8.98.321-11.64 1.93-11.64 1.93s-14.634 44.05-16.628 44.694c-1.994.643-1.663-7.073-1.663-7.073s-1.33 4.501-2.992 5.144c-1.663.645-.999-6.752-.999-6.752l-4.655 6.429.997-5.466-5.321 4.501s4.656-23.472 10.309-41.477c5.655-18.009 13.303-32.156 13.303-32.156Z" clip-rule="evenodd" />
        <path fill={color} fill-rule="evenodd" d="m34.07 456.011 16.627-.625 5.986 37.849-2.991-.625-1 2.189-3.989-.939-3.66 2.191-4.987-1.566-.665 3.13c-1.663-.314-5.321-41.604-5.321-41.604ZM63.94 495.446l43.897-6.684-.332-5.981-1.996-.35c1.33-1.759-4.322-3.167-4.322-3.167l6.318-3.516-.666-2.465-19.287 1.761 8.313-19.349 19.953-5.277-.997-3.166 1.663-1.76c-1.997-1.757 1.994-4.221 1.994-4.221l-.665-2.11 3.326-3.166-19.952 1.056 5.319-15.479 25.608-4.925 2.326-2.462 2.994-.353-.665-3.868-5.321-1.761 3.658-1.758-2.992-1.407 1.662-2.108-48.553 5.273.998 3.168-2.327 1.054.998 2.112c-1.665 2.462 3.99 3.87 3.99 3.87l-21.948 59.802 1.331 5.276-4.324 11.961ZM164.157 443.118l3.99-2.077c1.994 2.422 3.657.345 3.657.345.999 2.077 2.994 0 2.994 0l1.995 3.117s8.646-15.235 6.984-26.316c-1.663-11.078-9.311-16.62-17.957-15.925-8.647.692-27.603 8.653-37.58 43.626-9.975 34.969-4.324 49.166 12.638 47.435 16.961-1.732 29.595-18.005 31.925-25.275 2.327-7.273 2.659-14.543 2.659-14.543l-30.927 3.808s-2.66 2.424-2.991 3.462c-.334 1.039 3.325 1.733 3.325 1.733l-4.989 3.462h5.655l-3.328 2.078 3.992.346-3.658 3.81 15.298-1.735s-6.985 10.388-17.295 6.234c-10.307-4.155 5.655-34.969 9.644-44.665 3.992-9.694 9.977-15.235 14.966-13.502 4.987 1.729-.997 24.582-.997 24.582ZM232.328 444.063l2.33.355s10.308-21.285 8.978-27.316c-1.331-6.03-6.319-14.898-16.295-14.898-9.975 0-24.942 4.609-37.578 37.247-12.638 32.637-11.64 52.857 2.66 54.984 14.299 2.129 28.266-12.771 30.927-19.865 2.66-7.095 8.646-17.026 5.322-18.8-3.326-1.775-13.967-.356-18.624 0-4.655.352-8.313.709-8.313 1.774 0 1.063 1.664 1.417 1.664 1.417l-2.661 1.775 4.323 1.063-6.983 2.484v6.03l12.968-1.418s-3.326 10.996-11.308 9.932c-7.98-1.065-5.651-10.997 3.992-33.701 9.644-22.703 23.611-33.699 24.276-24.83.666 8.869-7.317 21.993-7.317 21.993l2.328-.353 3.327-5.677-1.331 5.677 2.328-.71 1.663 2.127c1.995-1.774 3.324.71 3.324.71ZM273.898 444.814l-10.643 1.388 4.657-15.937 1.663-1.385 3.326-1.733s.664 3.118 2.327 1.387l.665 3.809 1.995-3.809-3.99 16.28Zm16.96-38.453-4.656.694-4.655-1.731-3.659-3.12-2.327 2.772-2.994-2.077-4.324 2.769-3.657-.344-2.328-1.733-33.255 87.298 2.661-1.386 2.328 2.079 2.992-3.119h3.658s.665 2.773 1.996 0l2.993 2.426 11.972-27.712h11.307l-7.649 30.137.997 2.425 4.989-5.196 2.662 2.771 1.661-3.463 2.328 2.77 1.995-3.809.998 5.196 2.993-1.387 14.633-83.141-3.659-3.119ZM360.599 418.124l-30.262 5.425-5.321 15.195 19.953-1.447-3.326 2.895 2.661 1.084-4.656 2.895 5.321 2.171-2.329 6.872-21.948 4.704-7.315 18.452 27.6-4.342-1.329 2.17h5.321l-2.992 1.808 5.652 1.086-8.646 5.788 6.651 2.171-5.986 3.257-46.224 7.234-1.331-5.427 18.622-65.841-4.987.361 3.658-3.256-3.658-1.809-2.994-2.171 1.331-6.873 43.23-7.598 2.661 6.151 3.659-1.448v2.173l3.326 1.807 3.658 6.513ZM77.81 539.915c-.45 0-.82-.34-.857-.789l-.792-9.239a.434.434 0 0 0-.284-.37.431.431 0 0 0-.454.107l-7.69 7.959a.86.86 0 0 1-.464.25l-3.792.689a.853.853 0 0 1-.942-.504l-4.567-10.551a.43.43 0 0 0-.358-.258c-.012-.002-.024-.002-.037-.002a.426.426 0 0 0-.36.196l-7.656 11.778a.86.86 0 0 1-.722.389H43.66a.86.86 0 0 1-.767-1.251l9.66-18.967a.855.855 0 0 1 .764-.47h1.577a.43.43 0 0 0 .288-.111l3.079-2.773a.86.86 0 0 1 1.342.245l6.678 13.051a.429.429 0 0 0 .72.071l8.064-10.157a.892.892 0 0 1 .467-.302l4.14-1.032a.86.86 0 0 1 1.058.691l3.448 20.345a.85.85 0 0 1-.192.698.849.849 0 0 1-.656.307h-5.52ZM117.311 541.124a.862.862 0 0 1-.847-1.02l3.096-16.4a.423.423 0 0 0-.12-.385.422.422 0 0 0-.302-.124.622.622 0 0 0-.085.007l-1.574.314a.86.86 0 0 1-1.003-1.053l1.035-4.138a.858.858 0 0 1 .703-.642l20.006-3.104c.019-.002.039-.002.057-.002.304 0 .489.073.635.201a.851.851 0 0 1 .301.65v4.141a.864.864 0 0 1-.687.843l-10.961 2.256a.425.425 0 0 0-.326.305l-1.027 3.655a.433.433 0 0 0 .119.431.441.441 0 0 0 .295.115.402.402 0 0 0 .144-.026l7.128-2.564a.853.853 0 0 1 .859.163.86.86 0 0 1 .273.832l-.758 3.414a.864.864 0 0 1-.569.628l-7.684 2.553a.429.429 0 0 0-.295.39l-.091 2.408a.43.43 0 0 0 .431.446.473.473 0 0 0 .129-.018l11.21-3.544a.792.792 0 0 1 .26-.043c.27 0 .526.129.689.346l2.068 2.76a.854.854 0 0 1 .118.816.854.854 0 0 1-.625.54l-22.422 4.827a.82.82 0 0 1-.18.022ZM188.159 524.686c-2.149 0-4.402.481-5.555.767a.428.428 0 0 0-.313.31l-1.831 7.061a.425.425 0 0 0 .072.365.424.424 0 0 0 .33.173c.291.009.613.014.957.014 3.171 0 10.597-.505 11.045-5.189.094-1.004-.1-1.758-.595-2.303-.725-.795-2.108-1.198-4.11-1.198Zm-8.56 15.697c-4.251 0-7.611-.552-7.752-.575a.868.868 0 0 1-.563-.355.864.864 0 0 1-.142-.644l3.417-19.131-.322-3.043a.858.858 0 0 1 .552-.899c.049-.019 1.138-.43 2.243-.43.663 0 1.212.151 1.634.447a.43.43 0 0 0 .384.055l1.291-.43a.85.85 0 0 1 .771.119.857.857 0 0 1 .361.698v1.31c0 .211.153.39.363.425 9.652 1.528 15.859 3.209 17.029 4.614.843 1.015 1.221 2.62 1.035 4.404-.208 2.005-1.31 5.961-6.337 9.928-2.946 2.327-7.646 3.507-13.964 3.507Z" clip-rule="evenodd" />
        <path fill={color} fill-rule="evenodd" d="M188.159 524.686c-2.149 0-4.402.481-5.555.767a.428.428 0 0 0-.313.31l-1.831 7.061a.425.425 0 0 0 .072.365.424.424 0 0 0 .33.173c.291.009.613.014.957.014 3.171 0 10.597-.505 11.045-5.189.094-1.004-.1-1.758-.595-2.303-.725-.795-2.108-1.198-4.11-1.198Zm-8.56 15.697c-4.251 0-7.611-.552-7.752-.575a.868.868 0 0 1-.563-.355.864.864 0 0 1-.142-.644l3.417-19.131-.322-3.043a.858.858 0 0 1 .552-.899c.049-.019 1.138-.43 2.243-.43.663 0 1.212.151 1.634.447a.43.43 0 0 0 .384.055l1.291-.43a.85.85 0 0 1 .771.119.857.857 0 0 1 .361.698v1.31c0 .211.153.39.363.425 9.652 1.528 15.859 3.209 17.029 4.614.843 1.015 1.221 2.62 1.035 4.404-.208 2.005-1.31 5.961-6.337 9.928-2.946 2.327-7.646 3.507-13.964 3.507ZM229.033 540.604a.858.858 0 0 1-.76-1.152l2.757-7.616 3.468-8.292a.854.854 0 0 1 .792-.53h4.484a.862.862 0 0 1 .819 1.123l-5.174 16.186a.857.857 0 0 1-.81.599l-5.576-.318ZM235.636 520.246a.855.855 0 0 1-.671-.323l-1.381-1.727a.863.863 0 0 1-.058-.992l1.724-2.757a.865.865 0 0 1 .433-.353c.035-.012 3.35-1.237 5.793-1.237 1.443 0 2.432.456 2.861 1.314.437.873.242 1.525-.003 1.919-.306.496-.886.871-1.722 1.112a.438.438 0 0 0-.261.21.44.44 0 0 0-.032.332.858.858 0 0 1-.623 1.098l-5.863 1.379a.844.844 0 0 1-.197.025ZM286.685 524.144a.442.442 0 0 0-.192.044l-.193.097a.448.448 0 0 0-.205.22l-3.132 7.597a.428.428 0 0 0 .398.595l5.147-.444a.432.432 0 0 0 .381-.531l-1.786-7.251a.434.434 0 0 0-.418-.327Zm3.278 18.385a.862.862 0 0 1-.853-.804l-.265-3.968a.431.431 0 0 0-.43-.402h-8.334a.43.43 0 0 0-.274.097l-5.503 4.534a.862.862 0 0 1-.548.198l-3.872-.349a.866.866 0 0 1-.69-.469.872.872 0 0 1 .033-.835l14.142-23.113a.857.857 0 0 1 .682-.408s5.801-.341 5.935-.347c.361 0 .692.244.804.608l4.141 13.451 2.441 10.79a.86.86 0 0 1-.838 1.051l-6.571-.034Z" clip-rule="evenodd" />
        <path fill={color} fill-rule="evenodd" d="M286.685 524.144a.442.442 0 0 0-.192.044l-.193.097a.448.448 0 0 0-.205.22l-3.132 7.597a.428.428 0 0 0 .398.595l5.147-.444a.432.432 0 0 0 .381-.531l-1.786-7.251a.434.434 0 0 0-.418-.327Zm3.278 18.385a.862.862 0 0 1-.853-.804l-.265-3.968a.431.431 0 0 0-.43-.402h-8.334a.43.43 0 0 0-.274.097l-5.503 4.534a.862.862 0 0 1-.548.198l-3.872-.349a.866.866 0 0 1-.69-.469.872.872 0 0 1 .033-.835l14.142-23.113a.857.857 0 0 1 .682-.408s5.801-.341 5.935-.347c.361 0 .692.244.804.608l4.141 13.451 2.441 10.79a.86.86 0 0 1-.838 1.051l-6.571-.034Z" clip-rule="evenodd" />
        <path fill={color} d="m178.615 51.618-11.127-19.217 19.725 11.127-8.598 8.09Zm33.825 15.419c-2.024-28.319-25.732-52.84-37.871-55.369-12.138-2.529-20.738 6.069-20.738 6.069S132.588.542 127.025.542c-5.562 0-9.609 1.013-10.114 5.058l-.507 4.045s-8.597.506-11.632 8.092c-3.034 7.586 0 15.171 0 15.171l2.021 17.193s3.035-5.563 6.07-8.597c3.034-3.034 16.69-6.067 32.37 24.78 15.68 30.848-13.656 30.341-23.77 17.699-10.118-12.642-7.587-10.62-7.587-10.62V59.204s-6.069 3.541-6.576 5.563c-.507 2.023-1.01 4.045-1.01 4.045s-5.566-2.528-8.094 3.54c-2.528 6.07 1.517 13.655 11.128 22.757 7.432 7.043 10.62 12.136 9.608 19.216-1.011 7.081 1.458 20.982 1.458 20.982s3.094-29.072 33.441-33.624c30.346-4.551 60.633-6.328 58.609-34.646ZM219.016 64.003s.504 6.067-1.517 13.147c-2.024 7.08-4.491 8.857-4.491 8.857s22.192 15.165 29.779 7.831c4.946-4.78 1.012-14.665-5.563-21.24-6.576-6.573-18.208-8.595-18.208-8.595ZM217.56 55.158s7.526 1.26 15.618 6.316c6.671 4.169 11.694 10.372 11.694 10.372S241.837 41 226.158 25.323c-15.68-15.678-20.232-9.61-21.242-5.564-1.012 4.046 7.587 21.24 9.104 25.791 1.517 4.551 3.54 9.608 3.54 9.608Z" />
        <path fill={color} d="M187.658 101.424c14.074-4.266 25.348-10.36 25.348-10.36s6.253 5.543 9.104 7.08c6.576 3.541 14.607 4.292 14.607 4.292s-26.239 12.396-42.423 19.982c-16.186 7.585-27.374 16.429-36.478 30.082-7.278 10.915-13.656 27.296-13.656 37.423 0 17.699 3.634 30.679.063 32.119-5.625 2.268-24.845-23.018-23.328-54.37 1.518-31.353 10.321-40.921 24.278-52.087 10.116-8.093 28.842-10.027 42.485-14.161Z" />
        <path fill={color} d="M165.91 243.527c-6.209 1.549-25.229-25.028-12.583-60.932 12.642-35.904 48.75-54.016 60.693-60.177 18.145-9.362 34.391-14.665 37.933-34.894 3.538-20.229-2.59-34.14-1.58-40.21 1.011-6.068 16.753-15.418 21.305 13.407s5.056 63.719-27.819 81.924c-32.874 18.206-60.693 29.331-70.807 52.087-10.118 22.757-8.069 27.167-6.576 33.883 2.024 9.103 3.479 13.902-.566 14.912Z" />
        <path fill={color} d="M179.566 258.193c6.808.716 3.983-12.903 9.608-28.32 4.306-11.8 16.752-24.521 42.547-33.624 25.794-9.102 46.914-28.914 53.044-45.771 8.094-22.251 10.055-45.267 3.542-55.628-3.373-5.364-8.094 4.046-11.129 15.678-3.034 11.632-5.501 30.602-41.412 46.783-35.909 16.182-53.61 37.421-58.669 52.087-5.059 14.666-4.107 24.014-3.601 32.612.504 8.597 1.264 15.678 6.07 16.183ZM121.78 208.887s-6.449-12.895-6.954-39.192c-.349-18.202.505-25.79.505-25.79s-18.146-19.465-25.732-28.062c-7.587-8.598-9.104-10.62-9.104-10.62s7.08-10.113 6.07-21.745C85.55 71.846 75.94 60.216 70.376 62.238c-5.562 2.023 1.012 8.598 1.518 13.654.506 5.057 1.013 10.115-2.021 10.62-3.035.505-3.035-9.61-6.576-15.677-3.542-6.069-7.08-11.124-10.622-8.596-3.541 2.527 1.517 8.596 3.542 14.159 2.02 5.563 4.55 14.666.503 14.666-4.045 0-4.045-12.642-8.09-18.206-4.048-5.563-11.635-9.102-13.152-4.046-1.517 5.057 6.576 8.09 8.093 18.206 1.517 10.114-2.528 15.169-3.034 24.778-.507 9.61 16.69 30.848 27.818 43.997 11.125 13.148 53.424 53.094 53.424 53.094ZM135.119 224.569l28.26 28.566s-8.09 12.643-36.605 56.646c-9.918 15.303-31.168 44.495-34.71 46.012-3.54 1.517-18.904 2.028-21.432 4.052-2.529 2.024-4.553 16.185-11.128 15.678-6.574-.507-3.541-12.138-1.517-15.678 2.024-3.539 2.528-7.079 0-6.573l-2.528.505s-4.048 18.712-11.128 19.217c-7.08.505-4.552-7.585-2.023-13.654 2.53-6.068 5.565-9.104 2.53-10.114-3.035-1.011-6.07 6.575-9.104 13.148-3.035 6.574-3.541 9.608-7.587 9.103-4.046-.505-5.058-10.113-1.012-18.711 4.047-8.597 11.885-23.01 17.45-24.021 5.563-1.012 20.737.503 25.794-5.059 5.057-5.561 64.74-99.117 64.74-99.117Z" />
        <path fill={color} d="m120.263 238.091-17.008 22.889s-16.187-14.161-14.163-34.388c2.024-20.228 12.139-27.814 12.139-27.814l18.652 15.419s-6.576 5.562-5.562 13.147c1.01 7.586 5.942 10.747 5.942 10.747ZM77.256 239.503c-.23-2.714-.436-5.431-.607-8.148.073 2.734.262 5.457.607 8.148ZM185.382 272.857s.757-25.287 10.874-38.434c10.115-13.147 15.679-20.226 33.382-25.283 17.701-5.056 30.073-14.889 35.529-20.734 7.08-7.584 8.978-10.621 8.978-10.621s12.139 12.642 18.208 19.722c6.07 7.08 13.656 18.711 13.656 18.711s-10.621 6.573-24.277 3.034c-13.656-3.54-23.772-19.216-23.772-19.216l-4.552 5.562s22.76 35.399-6.069 47.03c-28.83 11.632-40.968-17.193-40.968-17.193l-2.023 3.541s8.092 20.227 8.092 31.354c0 11.126-9.104 20.227-9.104 20.227l-17.954-17.7Z" />
        <path fill={color} d="M217.054 258.451s4.046 8.596 1.011 20.227c-3.035 11.632-9.611 17.195-9.611 17.195s18.149 29.073 38.38 18.453c20.23-10.62 16.244-30.086 15.233-35.648-1.01-5.561-5.562-17.698-5.562-17.698s-12.645 6.573-24.277 3.539c-11.635-3.034-15.174-6.068-15.174-6.068ZM272.689 223.557s2.024 15.173-2.023 21.746c-4.047 6.574-7.081 10.62-7.081 10.62s4.552 12.644 14.668 18.206c10.116 5.561 23.772 3.034 29.841-1.518 6.069-4.551 16.691-16.184 8.092-35.4-8.599-19.216-7.587-14.159-7.587-14.159s-5.564 7.587-16.69 5.563c-11.127-2.024-19.22-5.058-19.22-5.058ZM271.171 278.678s-.505 17.195-4.045 25.286c-3.541 8.091-10.116 13.149-10.116 13.149s12.855 32.809 38.945 14.159c20.17-14.419 6.008-46.783 6.008-46.783s-6.008 4.304-16.629.765c-10.621-3.54-14.163-6.576-14.163-6.576ZM325.102 259.331s-1.58 9.341-4.932 14.033c-3.793 5.31-11.38 7.965-11.38 7.965s1.81 16.919 8.346 26.422c5.564 8.092 14.162 9.103 14.162 9.103s5.118-17.44 3.094-32.105c-2.021-14.666-9.29-25.418-9.29-25.418Z" />
        <path fill={color} d="M248.412 319.642s2.468 7.831 6.576 13.147c3.09 4.002 7.08 5.058 7.08 5.058s-5.012 17.958-23.771 17.194c-18.775-.765-23.453-20.234-22.443-27.82 1.011-7.585 1.897-10.619 1.897-10.619s5.69 6.447 13.463 6.579c11.731.199 17.198-3.539 17.198-3.539ZM313.722 311.671s2.969 4.935 6.51 7.464c3.539 2.529 10.115 2.529 10.115 2.529s-4.045 16.69-10.621 25.286c-6.576 8.596-13.149 7.079-17.701 1.01-4.552-6.068-5.566-10.113-5.566-10.113s6.576-1.517 11.128-10.619c4.552-9.103 6.135-15.557 6.135-15.557ZM291.907 341.387s1.014 6.916 4.493 11.372c4.045 5.184 9.356 5.942 9.356 5.942s-12.837 13.533-24.47 16.062c-11.632 2.529-18.712-5.562-19.219-12.642-.506-7.08 3.542-19.217 3.542-19.217s7.019 5.304 14.606 3.281c7.586-2.022 11.692-4.798 11.692-4.798ZM255.491 359.087s-1.517 8.089.507 13.147 9.549 7.328 9.549 7.328-18.208 5.561-31.298 5.316c-10.226-.193-14.667-2.529-14.667-2.529s0-12.644 11.128-17.701c11.125-5.056 24.781-5.561 24.781-5.561Z" />
        <path fill={color} d="M209.405 319.257s-1.455 14.038.568 21.623c2.022 7.586 14.099 18.959 14.099 18.959s-7.018 4.304-9.547 10.878c-2.53 6.574-2.53 10.115-2.53 10.115s-22.759 1.517-30.346-10.62c-7.587-12.137-8.313-25.604-2.023-35.4 10.561-16.441 29.779-15.555 29.779-15.555ZM180.132 378.302s-8.153-4.304-11.187-11.384c-3.035-7.08-3.48-12.384-3.48-12.384l-48.554-15.676c-1.2 2.776-4.235 6.948-7.649 15.292-3.188 7.789-11.318 22.383-11.318 22.383l82.188 1.769ZM165.91 347.196s.566-6.82 3.6-11.878c3.035-5.058 5.504-6.833 5.504-6.833l-32.815-29.577-20.04 32.106 43.751 16.182ZM180.07 321.912s6.131-4.801 11.695-6.823c6.2-2.253 9.307-2.344 19.952-3.289L168.5 258.958l-21.496 33.881 33.066 29.073ZM78.243 206.5c-.534 4.887-1.027 9.775-1.518 14.666.98-.262 1.955-.523 2.932-.786.02-4.45.305-8.684 1.499-13.006l-2.895.501c-2.262 17.178-7.468 36.5 2.513 52.231.397.626 3.104-.053 2.931-.786-1.827-7.68-2.223-15.582-4.048-23.264-.162-.684-3.086.049-2.932.786a118.44 118.44 0 0 0 6.577 21.24c.303.73 3.159-.166 2.931-.786-3.783-10.207-6.12-20.578-7.587-31.353-.086-.631-3.04-.013-2.931.786 1.467 10.775 3.805 21.144 7.587 31.353.978-.261 1.952-.525 2.931-.786-2.875-6.906-5.033-13.918-6.576-21.24-.977.261-1.953.525-2.932.786 1.826 7.681 2.223 15.583 4.049 23.264.977-.261 1.952-.525 2.931-.786-9.941-15.669-4.804-34.83-2.549-51.946.103-.787-2.702-.197-2.895.501-1.237 4.474-1.514 8.65-1.536 13.291-.003.555 2.848.052 2.932-.786.49-4.89.985-9.779 1.517-14.666.047-.432-2.831-.13-2.931.786Z" />
        <path fill={color} d="M76.705 206.21c-.894 3.509-1.779 6.994-2.025 10.62l2.976-.205c.205-4.564 1.1-8.643 2.954-12.858l-2.895-.085c-2.522 19.495-4.887 38.483 3.563 56.928.61 1.329 3.514.489 2.93-.784-8.353-18.237-6.01-37.09-3.517-56.349.198-1.521-2.454-1.081-2.892-.083-1.953 4.438-2.9 8.57-3.119 13.436-.068 1.573 2.883 1.168 2.976-.205.246-3.623 1.129-7.108 2.024-10.62.37-1.458-2.637-1.127-2.975.205ZM34.685 229.298c.03-1.544.078-3.087.174-4.63-.118.645-.223 1.291-.33 1.937.04.897.093 1.795.156 2.693ZM59.897 233.319c-.026-.44-.058-.878-.082-1.318-.218 5.322-.224 10.635.363 15.928.023.115.04.232.065.347.055.196.102.393.16.588-.664-5.181-.747-10.361-.506-15.545ZM65.26 242.831c-.01.827.002 1.653.005 2.482.386 1.087.821 2.159 1.287 3.219-.145-.545-.297-1.088-.414-1.643a64.277 64.277 0 0 1-.879-4.058Z" />
        <path fill={color} d="M25.644 252.584c-1.106-6.375-1.36-12.594-.845-18.694-.106 8.098 1.319 16.198 3.005 24.152a45.252 45.252 0 0 1-1.37-4.932c-.348.067-.71-.074-.79-.526Zm1.5-31.812.004-.048c.003-.012.008-.022.01-.033l-.015.081Zm6.975 31.587c.247 1.878.505 3.757.802 5.635.063.393-.142.675-.412.822l-.39-6.457Zm-7.02-17.671c.161-5.469.626-10.935 1.384-16.367l.726.154a43.737 43.737 0 0 0-.583 3.31l.834-3.257.289.06c-.923 11.714-1.3 23.76.7 35.363-2.215-8.361-3.123-17.027-2.465-25.611a88.226 88.226 0 0 0-.885 6.348Zm52.017 8.679c.295 1.132.614 2.256.946 3.376l-7.482 2.04a50.861 50.861 0 0 1-.694-2.532c.136.876.258 1.747.383 2.619l-6.4 1.745c-.176-.372-.364-.739-.533-1.114.012.414.03.831.043 1.247l-6.082 1.658a87.252 87.252 0 0 1-.276-1.747 59.944 59.944 0 0 1-2.249-10.007c.227 4.029.774 8.04 1.616 12.002l-3.436.937c-.826-4.633-1.237-9.312-1.319-14.003-.182-.88-.357-1.76-.527-2.638-.044 5.6.434 11.207 1.366 16.772l-4.308 1.174c-.116-.498-.256-.992-.368-1.49l.106 1.561-4.569 1.247c-1.734-6.437-2.597-12.979-2.69-19.531a105.35 105.35 0 0 0-.303 5.04c.028 4.09.267 8.171.873 12.237.183.901.357 1.788.54 2.685l-2.127.58a75.558 75.558 0 0 1-.455-3.541c-.165-.877-.338-1.751-.514-2.625.22 2.072.505 4.142.82 6.207l-1.66.453c-.036-.158-.072-.312-.105-.469-.378.283-1.01.225-1.196-.37-.291-.919-.568-1.843-.838-2.768.146 1.351.295 2.711.445 4.067l-1.566.428a79.447 79.447 0 0 1-1.807-16.867 114.963 114.963 0 0 1-1.155-7.795c-.06.684-.12 1.367-.164 2.054-.059.946-.09 1.893-.124 2.84l-1.188-19.751 8.913 1.879c-.51 3.637-.864 7.284-1.025 10.94.128 2.933.427 5.87.837 8.802.012-6.517.497-13.057.842-19.604l3.61.762c-.665 4.142-1.08 8.305-1.137 12.469.367 2.928.895 5.829 1.48 8.722-.518-4.152-.784-8.323-.421-12.506.155-1.781.446-3.516.793-5.234.049-1.084.13-2.171.198-3.258l3.51.74a92.524 92.524 0 0 0-.356 6.006c.114-1.996.264-3.994.427-5.991l4.395.927a88.923 88.923 0 0 0-.778 6.217c.099.85.21 1.704.34 2.558.14-2.907.422-5.809.761-8.707l4.055.856c-.044.299-.085.598-.13.897-.245 3.158-.336 6.346-.209 9.507.078-3.454.272-6.915.48-10.375l5.259 1.11c-.291 3.702-.285 7.427-.076 11.165.068-1.794.152-3.587.258-5.38-.02-1.91.067-3.812.225-5.7l5.59 1.181c-.044.447-.111.893-.148 1.342.138.898.298 1.796.472 2.693a75.51 75.51 0 0 1 .187-3.928l3.343.706c.124 1.332.277 2.664.482 3.991-.018-1.297-.014-2.592.008-3.89l2.694.569.745-5.784c.217 6.877.742 13.74 1.374 20.597Zm-48.653 20.762c-1.264-5.307-2.417-11.046-3.198-16.931.136 2.446.338 4.885.6 7.317.432 2.611.963 5.169 1.586 7.651-.31-.672-.6-1.35-.872-2.036a139.459 139.459 0 0 1-.713-5.615c-.96-5.81-1.45-11.856-1.527-17.817.152 3.506.465 7.024.926 10.5-.01-.185-.018-.37-.029-.557.659 5.711 2.06 11.285 4.346 16.484.341.772-.581 1.462-1.119 1.004Zm51.51-9.796-.565-3.504a49 49 0 0 0 .978 2.433c.208.476-.054.907-.412 1.071Zm-1.034-23.955c.634-18.726 13.149-37.928 13.149-37.928l-35.85-37.163s-33.979 15.418-34.898 75.35c-1.073 70.035 42.485 83.947 42.485 83.947l31.804-45.266s-17.763-7.339-16.69-38.94Z" />
        <path fill={color} d="M51.503 228.606c-.096 3.467-.113 6.928.071 10.368a92.393 92.393 0 0 1 .352-9.567 59.41 59.41 0 0 1-.23-2.413c-.078.535-.125 1.075-.193 1.612Z" />
    </svg>
);

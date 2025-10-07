import { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
    const bgMusicRef = useRef(null);
    useEffect(() => {
        if (!bgmRef.current) {
            bgmRef.current = new Howl({
                src: ['audio/funkysuspense.mp3'],
                loop: true,
                volume: 0.5,
            });
            bgmRef.current.play();
        }

        return () => bgmRef.current.stop();
    }, []);

    return null; // No UI component
};

export default BackgroundMusic;

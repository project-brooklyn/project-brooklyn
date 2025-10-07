import { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
    const bgMusicRef = useRef(null);
    useEffect(() => {
        if (!bgMusicRef.current) {
            bgMusicRef.current = new Howl({
                src: ['audio/funkysuspense.mp3'],
                loop: true,
                volume: 0.5,
            });
            bgMusicRef.current.play();
        }

        return () => bgMusicRef.current.stop();
    }, []);

    return null; // No UI component
};

export default BackgroundMusic;

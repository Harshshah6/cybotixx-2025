'use client'
import { Loader } from 'lucide-react';
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface LoaderContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && (<>
                <div onClick={() => { }} className="bg-black/60 w-screen h-screen z-100 fixed flex items-center justify-center">
                    <div className='bg-white rounded-lg overflow-hidden px-3 py-2 flex items-center gap-2'>
                        <Loader className='size-5 animate-spin' />
                        <p className='text-sm text-black/70'>Please Wait...</p>
                    </div>
                </div>
            </>)}
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoaderContext = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('Loader must be used within a LoaderContextProvider');
    }
    return context;
};
const LoadingAnimation=()=>{

    const loadingCircleTransition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
      }
    const loadingCircleVariants = {
        start: {
         top:'150px',
          height:'10px'
          // y: "0%",
        },
        end: {
          top:'0px',
          height:'150px'
          // y: "100%",
        },
      }
    const loadingContainerVariants = {
        start: {
          transition: {
            staggerChildren: 0.9,
          },
        },
        end: {
          transition: {
            staggerChildren: 0.9,
          },
        },
      }
      const loadingContainer = {
        
        width: "auto",
        height: "2rem",
        display: "contents",
        justifyContent: "space-around"
      };
      const loadingCircle = {
        display: "block",
        marginLeft:'10px',
        width: "1rem",
        height: "2rem",
        backgroundColor: "black",
        borderRadius: "10px",
      };


    return(
        <div className='flex items-center justify-center'>
            <div className='loading-bar'></div>
        </div>
    )
}

export default LoadingAnimation
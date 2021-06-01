import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Skeleton from '@material-ui/lab/Skeleton';
import AlertDialog from './DownloadAlert';
import GetAppIcon from '@material-ui/icons/GetApp';

const skeletonHeight = () => {
    let height = ''
    if (window.innerWidth <= 480) {
        height = "25vh"
    }
    else if (window.innerWidth <= 640) {
        height = "35vh"
    }
    else if (window.innerWidth <= 780) {
        height = "45vh"
    }
    else if (window.innerWidth <= 1000) {
        height = "60vh"
    }
    else if (window.innerWidth <= 1336) {
        height = "78vh"
    }
    else if (window.innerWidth >= 1336) {
        height = "55vh"
    }
    return height
}

const useStyles = makeStyles({
    thumbnailContainer: {
      margin: '10px auto',
    },
    downloadBtn: {
        marginLeft: 'auto',
        textDecoration: 'none',
    },
    InfoText: {
        fontSize: '20px',
    },
    skeleton: {
        width: '100%',
        height: skeletonHeight(),
    }
});

export default function ThumbnailView({ Width, videoId, infoText, isImageLoading, setIsImageLoading }) {

    const classes = useStyles();
    const [alertOpen, setAlertOpen] = useState(false)

    useEffect(() => {
        if (isImageLoading){
            setTimeout(() => {
                setIsImageLoading(false)
            }, 1000)
        }
    }, [isImageLoading])

    const ImageSource = (videoId) => {
        return "https://img.youtube.com/vi/" + videoId +"/maxresdefault.jpg"
    }

    const handleDownload = (videoId) => {
        fetch('https://cors-anywhere.herokuapp.com/' + videoId, {
        method: 'GET',
        headers: {
            'Content-Type': 'image',
        },
        })
        .then((response) => response.blob())
        .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
            new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Thumbnail.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        });
        setAlertOpen(true)
    };

    return (
        <div className={classes.thumbnailContainer} style={{width:Width}}> 
            <Card variant="outlined">
            {videoId === "" ? <center className={classes.InfoText}>{infoText}</center> :
                <>
                <CardActionArea>
                    <CardContent>
                        {isImageLoading ? <Skeleton variant="rect" className={classes.skeleton}/> : <img src={ImageSource(videoId)} alt="Thumbnail" title="Thumbnail" width="100%"/>}           
                    </CardContent> 
                </CardActionArea>
                <CardActions>
                    <Button className={classes.downloadBtn} onClick={() => handleDownload(ImageSource(videoId))} variant="contained" color="primary">
                        <GetAppIcon/> Download
                    </Button>
                </CardActions>
                </>
            }
            </Card>
            <AlertDialog open={alertOpen} setOpen={setAlertOpen} />
        </div>    
    );
}

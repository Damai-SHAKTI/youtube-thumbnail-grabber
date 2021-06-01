import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ThumbnailView from './ThumbnailView';

const useStyles = makeStyles({
  mainContainer: {
    margin: '10px auto',
  },
  description: {
    fontSize: 22,
  },
  textField: {
    width: '100%',
    marginTop: '10px',
  },
  actionBtn: {
    marginLeft: 'auto',
  }
});

export default function MainCardView({ Width }) {

  const classes = useStyles();
  const [videoId, setVideoId] = useState("")
  const [infoText, setInfoText] = useState("Thumbnail will be display here")
  const [isImageLoading, setIsImageLoading] = useState(true)

  const PasteFromClipboard = () => {
    navigator.clipboard.readText().then(text => {
      document.getElementById("filled-basic").focus();
      document.getElementById("filled-basic").value = text;
    })
    .catch(err => {
      console.log('Something went wrong', err);
    });
  }

  const ClearTextField = () => {
    document.getElementById("filled-basic").value = "";
  }

  const RemoveSpacesandTime = () => {
    let link = (document.getElementById("filled-basic").value).split(" ").join("");
    if (link.includes("&")) {
      link = link.split("&")[0];
    }
    else if (link.includes("#")) {
      link = link.split("#")[0];
    }
    return link
  }

  const ValidateLink = () => {
    if (document.getElementById("filled-basic") != null){
      let link = RemoveSpacesandTime()
      if (link.includes('youtube.com') && link.length === 43){
        setIsImageLoading(true);
        let index = link.indexOf("=");
        setVideoId(link.substring(index + 1, index + 12));
        setInfoText("")
      }
      else if (link.includes('youtu.be') && link.length === 28){
        setIsImageLoading(true);
        setVideoId(link.substr(link.length - 11))
        setInfoText("")
      }
      else if (link.includes('youtube.com/shorts') && link.length === 52){
        setIsImageLoading(true);
        link = link.split("?")[0]
        setVideoId(link.substr(link.length - 11))
        setInfoText("")
      }
      else if (document.getElementById("filled-basic").value === ""){
        setInfoText("TextField Cannot Be Empty!")
        setVideoId("")
      }
      else {
        setInfoText("Invalid Link [remember to include https://]")
        setVideoId("")
      }
    }
    
  }

  return (
    <>
    <div className={classes.mainContainer} style={{width: Width}}>
        <Card variant="outlined">
            <CardContent>
                <div className={classes.description} color="textSecondary">
                    <center>Paste the link of a youtube video below to get the thumbnail</center>
                </div>
                <TextField className={classes.textField} id="filled-basic" InputLabelProps={{shrink: true}} label="Paste YouTube Video Link Here" variant="filled" autoFocus />
            </CardContent>
            <CardActions>
                <Button onClick={() => PasteFromClipboard()} className={classes.actionBtn} variant="contained" color="primary">
                  Paste
                </Button>
                <Button onClick={() => ClearTextField()} className={classes.actionBtn} variant="contained" color="primary">
                  Clear
                </Button>
                <Button onClick={() => ValidateLink()} className={classes.actionBtn} variant="contained" color="primary">
                  Grab Thumbnail
                </Button>
            </CardActions>
        </Card>
    </div>
    <ThumbnailView Width={Width} videoId={videoId} infoText={infoText} isImageLoading={isImageLoading} setIsImageLoading={setIsImageLoading} />
    </>
  );
}

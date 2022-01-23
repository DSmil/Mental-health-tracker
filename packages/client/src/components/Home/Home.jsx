
import { Button} from '@chakra-ui/react'
import { ClassNames } from '@emotion/react';
import Navbar from "../Navbar/Navbar";
import Card from "./Card"
import "./Home.css"
import { Grid, GridItem  } from '@chakra-ui/react';

const Home = () => {
    return ( 
        <div >
            <Navbar/>
            <div className="Home"> 
            <Grid>
                <GridItem >
                    <Card title="Meet New People" img_link="https://www.happierhuman.com/wp-content/uploads/2019/08/meet-new-people-gym.jpg" link="https://www.happierhuman.com/meet-new-people/"about="Making new friends is not about reaching a celebrated number that only a few can reach. It is about meeting different people who may have experiences different than you. Your school and college friends are, to a large extent, exposed to the same experiences and same environment that you were exposed to. "/>
                </GridItem> 
                <GridItem>
                    <Card title="How to be happier" img_link="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_07/2233721/171120-smile-stock-njs-333p.jpg" link="https://www.nhs.uk/mental-health/self-help/tips-and-support/how-to-be-happier/" about="Doing things that you enjoy is good for your emotional wellbeing.Simple activities like watching sports with a friend, having a soak in the bath or meeting up with friends for coffee can all improve your day.Doing something you're good at, such as cooking or dancing, is a good way to enjoy yourself and have a sense of achievement."/>
                </GridItem>  
                <GridItem>
                    <Card title="Be More Productive" link="https://www.workzone.com/blog/how-to-be-more-productive/" img_link="https://www.taylorintime.com/wp-content/uploads/2021/09/productivity-problems.jpg" about="Small adjustments can lead to more lasting changes, but those may take time and discipline. It looks really easy when you’re reading a productivity article like this to think it’s easy. But it’s not. I’m not writing this from an expert point of view, but from a fellow worker in the fight against distraction."/>
                </GridItem>
            </Grid>
                
                
            
            
            </div>

            

        </div>
    
   )
    
};

export default Home;
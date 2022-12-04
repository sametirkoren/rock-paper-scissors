import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Space } from 'antd';
import {FaRegHandScissors, FaRegHandPaper, FaRegHandRock} from 'react-icons/fa';

function App() {
  const [userChoice, setUserChoice] = useState( {name: "rock", displayName:"TAŞ", component: <FaRegHandRock size={48} />});
  const [computerChoice, setComputerChoice] = useState( {name: "rock", displayName:"TAŞ", component: <FaRegHandRock size={48} />});
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState("");
  const [result, setResult]= useState("");
  const [gameOver, setGameOver] = useState(false);

  const choices = [
    {name: "rock", displayName:"TAŞ", component: <FaRegHandRock size={48} />},
    {name: "paper", displayName:"KAĞIT", component: <FaRegHandPaper size={48} />},
    {name: "scissors", displayName:"MAKAS", component: <FaRegHandScissors size={48} />}
  ];

  const handleOnClick = (choice: any) => {
    setUserChoice(choice)
    generateComputerChoice()
  }
  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice);
  }

  const reset = () => {
    window.location.reload();
  }

  useEffect(() => {
    const comboMoves = userChoice.name + computerChoice.name;
    if(userPoints <=2 && computerPoints <=2){
      if(comboMoves === "rockscissors" || comboMoves === "paperrock" || comboMoves === "scissorspaper"){
        const updatedUserPoints = userPoints + 1;
        setUserPoints(updatedUserPoints);
        setTurnResult("Sayı oyuncunun");
        if(updatedUserPoints === 3){
          setGameOver(true);
          setResult("Oyuncu kazandı");
        }
      }
      if(comboMoves === "scissorsrock" || comboMoves === "rockpaper" || comboMoves === "paperscissors"){
        const updatedComputerPoints = computerPoints + 1;
        setComputerPoints(updatedComputerPoints);
        setTurnResult("Sayı bilgisayarın");
        if(updatedComputerPoints === 3){
          setGameOver(true);
          setResult("Bilgisayar kazandı");
        }
      }

      if(comboMoves === "rockrock" || comboMoves === "paperpaper" || comboMoves === "scissorsscissors"){
       setTurnResult("İki tarafada sayı yok")
      }
    }
  }, [userChoice, computerChoice])
  
  return (
    <div style={{width: "100%", height:"100vh", overflow: 'hidden', position:"relative"}}>
        <Row style={{ display: "flex", justifyContent:"center", alignItems:"center", height: "inherit"}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={6}>
      <Card headStyle={{textAlign:"center", background: "#0d2245", color: "white"}} bodyStyle={{textAlign:"center"}} title="Skor" style={{ width: "100%",border:"1px solid" }}>
      <p>Oyuncu: {userPoints}</p>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div style={{width:"50%", height: "inherit", display:"flex", justifyContent:"center", alignItems:"center"}}>
          {userChoice.component}
        </div>
      </div>
    </Card>
      </Col>
      <Col className="gutter-row" span={6}>
      <Card headStyle={{textAlign:"center",  background: "#0d2245", color: "white"}} bodyStyle={{textAlign:"center"}} title="Skor" style={{ width: "100%", border:"1px solid" }}>
      <p>Bilgisayar: {computerPoints}</p>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div style={{width:"50%", height: "inherit", display:"flex", justifyContent:"center", alignItems:"center"}}>
         {computerChoice.component}
        </div>
      </div>
    </Card>
      </Col>

    </Row>
      <div style={{position: "absolute", bottom:"20%", left:"50%", transform: "translate(-50%, -20%)"}}>
        <Space>
          {choices.map((choice, index) => 
                  <Button disabled={gameOver} onClick={() => handleOnClick(choice)} style={{height: "80px"}}>
                  <div>
                    <div>{choice.displayName}</div>
                    {choice.component}
                  </div>
                  </Button>
          )}
        </Space>
    

      </div>
      <div style={{position: "absolute", top:"20%", left:"50%", transform: "translate(-50%, -20%)"}}>
            <div>Tur Sonucu: {turnResult}</div>
            {result !== "" && <div>Final Sonucu: {result}</div>} 
      </div>

      <div style={{position: "absolute", top:"25%", left:"50%", transform: "translate(-50%, -25%)"}}>
          {gameOver &&<Button type="primary" onClick={() => reset()}>Yeniden Başlat</Button>}
      </div>
    </div>
  
  )
}

export default App

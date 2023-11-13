"use client";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Game() {
  const [Arr, SetArr] = useState([3, 3, 3, 3, 3, 3, 3, 3, 3]); //A1(0), B1(1), C1(2), A2(3), B2(4), C2(5), A3(6), B3(7), C3(8) Where Letter is X Axis and Number is Y Axis, number in () is index.
  const [PlayerValue, SetPlayerValue] = useState(1);
  const [GameFinished, SetGameFinished] = useState(false);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function reset() {
    const defaultArr = [3, 3, 3, 3, 3, 3, 3, 3, 3];
    SetArr(defaultArr);
    SetPlayerValue(1);
    SetGameFinished(false);
  }

  const winAlert = () =>
    toast.success(`Player ${PlayerValue === 1 ? "Circle" : "Cross"} Won!`, {
      position: "top-center",
      autoClose: 4700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const drawAlert = () =>
    toast.info("We have a Draw!", {
      position: "top-center",
      autoClose: 4700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    const handleGameLogic = async () => {
      PlayerValue === 2 ? SetPlayerValue(1) : SetPlayerValue(2);
      {
        /*Checking if anyone is winning*/
      }
      if (checkWinner([Arr.slice(0, 3), Arr.slice(3, 6), Arr.slice(6)])) {
        SetGameFinished(true);
        winAlert();
        await sleep(5000);
        reset();
      } else if (
        isBoardFull([Arr.slice(0, 3), Arr.slice(3, 6), Arr.slice(6)])
      ) {
        SetGameFinished(true);
        drawAlert();
        await sleep(5000);
        reset();
      }
    };

    handleGameLogic();
  }, Arr);

  const imageHolder = (x: number) => (
    <img
      draggable="false"
      src={Arr[x] === 1 ? "/Circle.png" : "/Cross.png"}
      className="w-[6.25rem]"
    />
  );

  const imageButton = (x: number) => (
    <button
      onClick={
        GameFinished
          ? () => console.log("Just hanging around!")
          : () => changeArrValue(x, Arr)
      }
      className="text-white w-[7rem] h-[7rem]"
    >
      Click
    </button>
  );

  function changeArrValue(x: number, array: number[]) {
    const newArray = [...array];
    if (newArray[x] === 3) {
      newArray[x] = PlayerValue;
    }

    SetArr(newArray);
  }

  function checkWinner(board: number[][]) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        (board[i][0] == board[i][1] &&
          board[i][1] == board[i][2] &&
          board[i][0] !== 3) ||
        (board[0][i] == board[1][i] &&
          board[1][i] == board[2][i] &&
          board[0][i] !== 3)
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      (board[0][0] == board[1][1] &&
        board[1][1] == board[2][2] &&
        board[0][0] !== 3) ||
      (board[0][2] == board[1][1] &&
        board[1][1] == board[2][0] &&
        board[0][2] !== 3)
    ) {
      return true;
    }

    return false;
  }

  function isBoardFull(board: number[][]) {
    return board.flat().every((cell) => cell !== 3);
  }

  return (
    <>
      {/*Alert container*/}
      <ToastContainer />
      {/*Showing whos turn is now*/}
      <div className="absolute grid place-items-center bg-white border-2 border-border m-3 w-[9.5rem] h-[2.5rem] rounded-sm">
        <div className="flex ">
          <p className="text-border">Now's Turn:</p>
          <img
            draggable="false"
            className="w-[1.5rem] ml-[.75rem]"
            src={PlayerValue === 1 ? "/Circle.png" : "/Cross.png"}
          />
        </div>
      </div>
      {/*Comercial Break*/}
      <div className="grid h-screen place-items-center">
        {/*Our game grid*/}
        <img
          draggable="false"
          src="/Grid.png"
          alt="Grid"
          className="w-[35rem]"
        />
        {/*Grid that holds our icons*/}
        <div className="absolute grid grid-rows-3 grid-flow-col gap-[4rem]">
          {/*First holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[0] === 3 ? imageButton(0) : imageHolder(0)}
          </div>
          {/*Second holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[1] === 3 ? imageButton(1) : imageHolder(1)}
          </div>
          {/*Third holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[2] === 3 ? imageButton(2) : imageHolder(2)}
          </div>
          {/*Fourth holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[3] === 3 ? imageButton(3) : imageHolder(3)}
          </div>
          {/*Fifth holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[4] === 3 ? imageButton(4) : imageHolder(4)}
          </div>
          {/*Sixth holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[5] === 3 ? imageButton(5) : imageHolder(5)}
          </div>
          {/*Seventh holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[6] === 3 ? imageButton(6) : imageHolder(6)}
          </div>
          {/*Eighth holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[7] === 3 ? imageButton(7) : imageHolder(7)}
          </div>
          {/*Nineth holder*/}
          <div className="grid place-items-center w-[8rem] h-[8rem] rounded-md">
            {/*Checking value of arr, if value 3 then btn otherwise image*/}
            {Arr[8] === 3 ? imageButton(8) : imageHolder(8)}
          </div>
        </div>
        {/*Grid that holds our icons ends*/}
      </div>
    </>
  );
}

export default Game;

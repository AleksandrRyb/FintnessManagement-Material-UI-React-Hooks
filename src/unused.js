import {exercises, muscles} from "./store";

const getExerciseByMuscles=()=>{
    /*  return Object.entries(this.state.exercises.reduce((exercises, exercise)=>{
          const {muscle}=exercise;
          exercises[muscle]=exercises[muscle]? {...exercises[muscle], exercise}:{exercise};
          //exercises[muscle]={...exercises[muscle], exercise}
          return exercises;
      }, {}) );//Object.entries() turns object into array*/
    console.log('running')
    let tempExercisePlan=[];
    exercises.forEach((exercise, index)=>{
        muscles.forEach(muslce=>{
            if(muslce===exercise.muscle){
                const myExicise={...exercise};
                const myMuslce=muslce;
                let tempArr=[]
                //console.log('exercise',myExicise, 'muscle', myMuslce)
                if(tempExercisePlan[myMuslce]){
                    tempArr.push(tempExercisePlan[myMuslce])
                    //const tempMyPlan=tempExercisePlan[myMuslce];
                    tempArr.push([{myExicise}]);
                    tempExercisePlan[myMuslce]={...tempArr}
                }else {
                    tempArr.push([{myExicise}]);
                    tempExercisePlan[myMuslce]={...tempArr}
                }
            }
        });
    })
    return  tempExercisePlan;
};

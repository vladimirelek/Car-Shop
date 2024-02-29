import "./addNewCar-style.css";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../../api/agent";
import { useAppSelector } from "../../../redux/store";
import { useEffect } from "react";
const NewCar = () => {
  const selector = useAppSelector((state) => state.auth);
  const userId = selector.user?.id;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm();
  useEffect(() => {
    setValue("userId", userId);
  }, []);
  const submit = async (data: FieldValues) => {
    console.log(data);
    const formData = new FormData();
    formData.append("addedPhoto", data.addedPhoto[0]);
    formData.append("proizvodjac", data.proizvodjac);
    formData.append("cijena", data.cijena);
    formData.append("godiste", data.godiste);
    formData.append("gorivo", data.gorivo);
    formData.append("model", data.model);
    formData.append("kilometraza", data.kilometraza);
    formData.append("brojVrata", data.brojVrata);
    formData.append("kubikaza", data.kubikaza);
    formData.append("snagaMotora", data.snagaMotora);
    formData.append("userId", data.userId);
    await agent.Cars.addNewCar(formData);
    reset();
  };
  return (
    <div className="form-container">
      <form
        className="form"
        onSubmit={handleSubmit(submit)}
        encType="multipart/form-data"
      >
        <div className="prvi-dio">
          <label>Proizvodjac</label>
          <input
            className="input"
            type="text"
            {...register("proizvodjac")}
          ></input>
          <label>Cijena</label>
          <input
            className="input"
            type="number"
            {...register("cijena")}
          ></input>
          <label>Gorivo</label>
          <input className="input" type="text" {...register("gorivo")}></input>
          <label>Godiste</label>
          <input
            className="input"
            type="number"
            {...register("godiste")}
          ></input>
        </div>
        <div className="drugi-dio">
          <label>Model</label>
          <input className="input" type="text" {...register("model")}></input>
          <label>Kilometraza</label>
          <input
            className="input"
            type="number"
            {...register("kilometraza")}
          ></input>
          <label>Kubikaza</label>
          <input
            className="input"
            type="number"
            step="any"
            {...register("kubikaza")}
          ></input>
          <label>Broj vrata</label>
          <input
            className="input"
            type="number"
            {...register("brojVrata")}
          ></input>
          <label>Snaga motora</label>
          <input
            className="input"
            type="number"
            {...register("snagaMotora")}
          ></input>
          <label>DODAJ SLIKU</label>
          <input
            type="file"
            className="file"
            {...register("addedPhoto")}
          ></input>
          <button type="submit" className="add-car-button">
            DODAJ AUTOMOBIL
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewCar;

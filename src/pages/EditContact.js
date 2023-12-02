import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    endereco: "",
    bairro: "",
    cpf: "",
    forma_pagamento: "",
    prescricao: "",
    codigo_armacao: "",
    codigo_lente: "",
    compras: [
      {
        valor_total: 0,
        quantidade_parcelas: 0,
        parcelas: [
          {
            numero: 0,
            valor: 0,
            data_vencimento: "",
            status: "pendente",
          },
        ],
      },
    ],
    preco: 0,
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:7777/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Updated [${userDetails.name}] contact`);

      setUserDetails({
        name: "",
        address: "",
        email: "",
        endereco: "",
        bairro: "",
        cpf: "",
        forma_pagamento: "",
        prescricao: "",
        codigo_armacao: "",
        codigo_lente: "",
        compras: [
          {
            valor_total: 0,
            quantidade_parcelas: 0,
            parcelas: [
              {
                numero: 0,
                valor: 0,
                data_vencimento: "",
                status: "pendente",
              },
            ],
          },
        ],
        preco: 0,
        phone: "",
      });

      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:7777/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      setUserDetails({
        name: result.name || "",
        email: result.email || "",
        address: result.address || "",
        phone: result.phone || "",
        endereco: result.endereco || "",
        bairro: result.bairro || "",
        cpf: result.cpf || "",
        forma_pagamento: result.forma_pagamento || "",
        prescricao: result.prescricao || "",
        codigo_armacao: result.codigo_armacao || "",
        codigo_lente: result.codigo_lente || "",
        compras: result.compras
          ? [
              {
                valor_total: result.compras[0]?.valor_total || 0,
                quantidade_parcelas: result.compras[0]?.quantidade_parcelas || 0,
                parcelas: [
                  {
                    numero: result.compras[0]?.parcelas[0]?.numero || 0,
                    valor: result.compras[0]?.parcelas[0]?.valor || 0,
                    data_vencimento: result.compras[0]?.parcelas[0]?.data_vencimento || "",
                    status: result.compras[0]?.parcelas[0]?.status || "pendente",
                  },
                ],
              },
            ]
          : [
              {
                valor_total: 0,
                quantidade_parcelas: 0,
                parcelas: [
                  {
                    numero: 0,
                    valor: 0,
                    data_vencimento: "",
                    status: "pendente",
                  },
                ],
              },
            ],
        preco: result.preco || 0,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit your contact</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Name Of Person
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressInput" className="form-label mt-4">
                Address Of Person
              </label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="WalkStreet 05, California"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Email Of Person
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput" className="form-label mt-4">
                Phone Number Of Person
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="+977 987654321"
                required
              />
            </div>

            {/* Campos adicionais do formulário */}
            <div className="form-group">
              <label htmlFor="enderecoInput" className="form-label mt-4">
                Endereco
              </label>
              <input
                type="text"
                className="form-control"
                id="enderecoInput"
                name="endereco"
                value={userDetails.endereco}
                onChange={handleInputChange}
                placeholder="Endereco"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bairroInput" className="form-label mt-4">
                Bairro
              </label>
              <input
                type="text"
                className="form-control"
                id="bairroInput"
                name="bairro"
                value={userDetails.bairro}
                onChange={handleInputChange}
                placeholder="Bairro"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpfInput" className="form-label mt-4">
                CPF
              </label>
              <input
                type="text"
                className="form-control"
                id="cpfInput"
                name="cpf"
                value={userDetails.cpf}
                onChange={handleInputChange}
                placeholder="CPF"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="formaPagamentoInput" className="form-label mt-4">
                Forma de Pagamento
              </label>
              <input
                type="text"
                className="form-control"
                id="formaPagamentoInput"
                name="forma_pagamento"
                value={userDetails.forma_pagamento}
                onChange={handleInputChange}
                placeholder="Forma de Pagamento"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prescricaoInput" className="form-label mt-4">
                Prescricao
              </label>
              <textarea
                className="form-control"
                id="prescricaoInput"
                name="prescricao"
                value={userDetails.prescricao}
                onChange={handleInputChange}
                placeholder="Prescricao"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoArmacaoInput" className="form-label mt-4">
                Codigo Armacao
              </label>
              <input
                type="text"
                className="form-control"
                id="codigoArmacaoInput"
                name="codigo_armacao"
                value={userDetails.codigo_armacao}
                onChange={handleInputChange}
                placeholder="Codigo Armacao"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoLenteInput" className="form-label mt-4">
                Codigo Lente
              </label>
              <input
                type="text"
                className="form-control"
                id="codigoLenteInput"
                name="codigo_lente"
                value={userDetails.codigo_lente}
                onChange={handleInputChange}
                placeholder="Codigo Lente"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="comprasInput" className="form-label mt-4">
                Valor Total de Compras
              </label>
              <input
                type="number"
                className="form-control"
                id="comprasInput"
                name="compras"
                value={userDetails.compras && userDetails.compras[0] ? userDetails.compras[0].valor_total : 0}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    compras: [
                      {
                        ...userDetails.compras[0],
                        valor_total: e.target.value,
                      },
                    ],
                  })
                }
                placeholder="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantidadeParcelasInput" className="form-label mt-4">
                Quantidade de Parcelas
              </label>
              <input
                type="number"
                className="form-control"
                id="quantidadeParcelasInput"
                name="quantidade_parcelas"
                value={userDetails.compras && userDetails.compras[0] ? userDetails.compras[0].quantidade_parcelas : 0}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    compras: [
                      {
                        ...userDetails.compras[0],
                        quantidade_parcelas: e.target.value,
                      },
                    ],
                  })
                }
                placeholder="0"
                required  
              />
            </div>
            <input type="submit" value="Save Changes" className="btn btn-info my-2" />
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;

from typing import Any

from .registry import Homework, InputField, registry


def des_oracle(inputs: dict[str, Any]) -> dict[str, Any]:
    from homework_solutions.des import encrypt

    plaintext = inputs["plaintext"]
    key = inputs["key"]
    ciphertext = encrypt(plaintext, key)
    return {"ciphertext": ciphertext}


des_homework = Homework(
    id="des",
    title="DES Encryption",
    description="Compute DES ciphertext from a plaintext and key (hex strings).",
    input_schema=[
        InputField(name="plaintext", label="Plaintext (hex)", type="text"),
        InputField(name="key", label="Key (hex)", type="text"),
    ],
    oracle_function=des_oracle,
)

registry.register(des_homework)

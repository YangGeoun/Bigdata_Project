package com.bigdataproject.injectionprocess.python.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
public class PythonService {


    public String runPythonScript() {
        try {
            ProcessBuilder pb = new ProcessBuilder("python", "C:\\Users\\Admin\\test.py");
            Process process = pb.start();

            // Python 스크립트에서 출력한 결과 읽어오기
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                // 에러 발생 시 에러 스트림 읽기
                BufferedReader errReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
                StringBuilder errorOutput = new StringBuilder();
                while ((line = errReader.readLine()) != null) {
                    errorOutput.append(line);
                }
                return errorOutput.toString();
            }
            // Python 스크립트의 결과({ "square": 144 })를 클라이언트에 응답
            return output.toString();
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}

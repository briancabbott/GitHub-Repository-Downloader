{-
Copyright (c) 2018-2021 VMware, Inc.
SPDX-License-Identifier: MIT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-}

{-# LANGUAGE TemplateHaskell #-}

module Language.DifferentialDatalog.Version (
    dDLOG_VERSION,
    gitHash)
where

import GitHash
import Data.List

-- Keep this in sync with the binary release version on github
dDLOG_VERSION :: String
dDLOG_VERSION = "v1.2.3"

gitInfoCwdTry :: Either String GitInfo
gitInfoCwdTry = $$tGitInfoCwdTry

gitHash :: String
gitHash =
    case gitInfoCwdTry of
        Left err -> case isInfixOf "GHEGitRunFailed" err of
            True -> "built from sources"
            False -> error "gitHash error - failed to obtain GitInfo"
        Right gitInfo -> giHash gitInfo
